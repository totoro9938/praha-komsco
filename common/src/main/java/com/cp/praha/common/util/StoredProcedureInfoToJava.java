package com.cp.praha.common.util;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class StoredProcedureInfoToJava {
    public static void main(String[] args) throws Exception{
        if(args.length == 0){
            System.out.println("프로시져명을 입력하세요!");
            System.exit(0);
        }

        String procName = args[0];//"USP_VISITOR_RESERVE_SEL";
        String className = className(args[0]);//"VisitorReserveSel";
        String schemaName = "dbo";
        boolean isExecuteCommand = (args[1].equals("1"));
        String url = "jdbc:mariadb://062.centerlink.kr:33066/callcenter_komsco";
        String user = "callcenter";
        String password = "#centerlink!";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            DatabaseMetaData dbmd = conn.getMetaData();
            ResultSet rs = dbmd.getProcedureColumns(null, schemaName, procName, null);

            List<String> paramNames = new ArrayList<>();
            List<String> paramTypes = new ArrayList<>();
            List<String> paramModes = new ArrayList<>();

            while (rs.next()) {
                String paramName = rs.getString("COLUMN_NAME");
                String paramType = rs.getString("TYPE_NAME");
                String paramMode = rs.getString("COLUMN_TYPE");

                paramNames.add(paramName);
                paramTypes.add(paramType);
                paramModes.add(paramMode);
            }


            System.out.println();
            System.out.println("import om.cp.praha.common.util.ProcErrorHandler;" +
                    "import lombok.AccessLevel;\n" +
                    "import lombok.Getter;\n" +
                    "import lombok.NoArgsConstructor;\n" +
                    "import lombok.Setter;\n" +
                    "import lombok.ToString;\n" +
                    "\n" +
                    "import javax.persistence.Entity;\n" +
                    "import javax.persistence.EntityManager;\n" +
                    "import javax.persistence.Id;\n" +
                    "import javax.persistence.NamedStoredProcedureQuery;\n" +
                    "import javax.persistence.ParameterMode;\n" +
                    "import javax.persistence.StoredProcedureParameter;\n" +
                    "import javax.persistence.StoredProcedureQuery;\n");
            System.out.println();
            System.out.println("@NamedStoredProcedureQuery(");
            System.out.printf("    name = %sProc.PROC_NAME,\n",className);
            System.out.printf("    procedureName = %sProc.PROC_NAME,\n",className);
            System.out.printf("    resultClasses = %sProc.class,\n",className);
            System.out.println("    parameters = {");

            for (int i = 0; i < paramNames.size(); i++) {
                String paramName = paramNames.get(i);
                String paramType = paramTypes.get(i);
                String paramMode = paramModes.get(i);

                String parameter = "        @StoredProcedureParameter(name = \"" + paramName + "\", type = " + sqlTypeToJavaType(paramType) + ".class, mode = ParameterMode." + (paramMode.equals("1") ? "IN":"OUT") + ")";
                if (i == paramNames.size() - 1) {
                    System.out.println(parameter);
                } else {
                    System.out.println(parameter + ",");
                }
            }

            System.out.println("    }");
            System.out.println(")");
            System.out.println("@Getter");
            System.out.println("@Setter");
            System.out.println("@ToString");
            System.out.println("@Entity");
            System.out.println("@NoArgsConstructor(access = AccessLevel.PROTECTED)");
            System.out.printf("public class %sProc {\n",className);
            System.out.println();
            System.out.printf("    public static final String PROC_NAME = \"%s\";\n",procName);
            System.out.println();
            if(!args[2].isEmpty()){
                createEntity(conn,args[2]);
            }else {
                System.out.println("    @Id");
                System.out.println("    private int id;");
            }
            System.out.println();
            System.out.printf("    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, %sCommand command) {\n\n",className);
            System.out.println("        StoredProcedureQuery query = ProcedureQuery.get(entityManager, PROC_NAME);\n");
            if(!isExecuteCommand) {
                for (String paramName : paramNames) {
                    if (isCreate(paramName))
                        System.out.printf("        query.setParameter(\"%s\", %s);\n",paramName,command(paramName));
                }
            } else {
                System.out.println("        command.setStoredProcedureParameters(query);");
            }
            System.out.println("        query.execute();");
            System.out.println();
            System.out.println("        ProcErrorHandler.errorHandler(query);");
            System.out.println();
            System.out.println("        return query;");
            System.out.println("    }");
            System.out.println("}");

            System.out.println("=======================");
            System.out.println("import lombok.Getter;\n" +
                    "import lombok.Setter;");
            System.out.println();
            System.out.println();
            System.out.println("@Setter");
            System.out.println("@Getter");
            System.out.printf("public class %sCommand {\n\n",className);
            for (int i = 0; i < paramNames.size(); i++) {
                String paramName = paramNames.get(i);
                String paramType = paramTypes.get(i);
                if (isCreate(paramName))
                    System.out.printf("    private %s %s;\n", sqlTypeToJavaTypeCommand(paramType),camelCase(paramName,1));
            }
            System.out.println();
            if(isExecuteCommand) {
                System.out.println("    public void setStoredProcedureParameters(StoredProcedureQuery query) {");
                System.out.println();
                for (String paramName : paramNames) {
                    if (isCreate(paramName))
                        System.out.printf("        query.setParameter(\"%s\", %s);\n",paramName, camelCase(paramName,1));
                }
                System.out.println();
                System.out.println("    }");
            }
            System.out.println("\n}");
        }
    }

    private static void createEntity(Connection conn,String proc) throws SQLException {
        CallableStatement cstmt = conn.prepareCall(String.format("{call %s }",proc));
        cstmt.registerOutParameter(1, Types.VARCHAR);
        cstmt.registerOutParameter(2, Types.VARCHAR);
        ResultSet rs = cstmt.executeQuery();
        ResultSetMetaData meta = rs.getMetaData();

        int columnCount = meta.getColumnCount();
        for (int i = 1; i <= columnCount; i++) {
            String columnName = meta.getColumnLabel(i);
            String columnType = meta.getColumnTypeName(i);
            System.out.printf("    private %s %s;\n", sqlTypeToDomain(columnType),camelCase(columnName,0));
        }
        conn.close();
    }

    private static boolean isCreate(String paramName){
        String[] s = paramName.split("_");
        return (s[0].equals("V") && !"V_COMPANY_CD".equals(paramName));
    }

    private static String className(String text){
        AtomicInteger index= new AtomicInteger();
        return Arrays.stream(text.split("_"))
                .map(word -> {
                    String s="";
                    if(index.get() ==0){
                        index.getAndIncrement();
                        return "";
                    }else{
                        s= Character.toUpperCase(word.charAt(0)) + word.substring(1).toLowerCase();
                    }
                    index.getAndIncrement();
                    return s;
                })
                .collect(Collectors.joining());
    }

    private static String command(String text){
        AtomicInteger index= new AtomicInteger();
        String param =  Arrays.stream(text.split("_"))
                .map(word -> {
                    String s="";
                    if(index.get() ==0){
                        index.getAndIncrement();
                        return s;
                    }else{
                        s= Character.toUpperCase(word.charAt(0)) + word.substring(1).toLowerCase();
                    }
                    index.getAndIncrement();
                    return s;
                })
                .collect(Collectors.joining());
        return String.format("command.get%s()",param);
    }

    private static String camelCase(String text,int start){
        AtomicInteger index= new AtomicInteger();
        return Arrays.stream(text.split("_"))
                .map(word -> {
                    String s="";
                    if(index.get() ==0){
                        index.getAndIncrement();
                        return start == 0 ? word.toLowerCase():s;
                    }else if(index.get() ==1){
                        s= start == 0 ? Character.toUpperCase(word.charAt(0)) + word.substring(1).toLowerCase(): word.toLowerCase();
                    }else{
                        s= Character.toUpperCase(word.charAt(0)) + word.substring(1).toLowerCase();
                    }
                    index.getAndIncrement();
                   return s;
                })
                .collect(Collectors.joining());
    }
    private static String sqlTypeToJavaTypeCommand(String sqlType) {

        if (sqlType.equals("int")) {
            return "int";
        }
        return "String";
    }

    private static String sqlTypeToJavaType(String sqlType) {

        if (sqlType.equals("int")) {
            return "Integer";
        }
        return "String";
    }

    private static String sqlTypeToDomain(String sqlType) {

        if (sqlType.equals("INTEGER")) {
            return "int";
        }else if(sqlType.equals("DATETIME") || sqlType.equals("DATE")){
            return "ZonedDateTime";
        }
        return "String";
    }
}
