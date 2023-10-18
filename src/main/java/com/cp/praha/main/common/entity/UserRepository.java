package com.cp.praha.main.common.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    String USER_DEPT_QUERY = "SELECT  tu.user_id as user_id, UFN_DEC_AES(tu.user_nm) as user_nm, UFN_DEC_AES(tel_no) as tel_no, tu.CTI_YN \n" +
            "FROM tb_user tu\n" +
            "INNER JOIN  tb_id_history tih\n" +
            "   ON tu.COMPANY_CD = tih.COMPANY_CD\n" +
            "  AND tih.TABLE_NM  = 'TB_DEPT'\n" +
            "  AND tu.DEPT_ID    = tih.ID\n" +
            "  WHERE tih.PARENT_ID = :deptId" +
            "  AND tu.use_yn in( :useYn)" +
            "  AND tu.DEL_YN = 'N' AND tu.SYS_YN = 'N' ORDER BY UFN_DEC_AES(tu.user_nm)";

    String USER_QUERY = "SELECT  user_id as user_id, UFN_DEC_AES(user_nm) as user_nm, UFN_DEC_AES(tel_no) as tel_no, CTI_YN \n" +
            "FROM tb_user \n" +
            "  WHERE use_yn in( :useYn)" +
            "  AND DEL_YN = 'N' AND SYS_YN = 'N' ORDER BY UFN_DEC_AES(user_nm)";

    String USER_MATCH_DEPT_QUERY = "SELECT  tu.user_id as user_id, UFN_DEC_AES(tu.user_nm) as user_nm, UFN_DEC_AES(tel_no) as tel_no, tu.CTI_YN\n" +
            "            FROM tb_user tu\n" +
            "            where tu.DEPT_ID = :deptId" +
            "              AND tu.use_yn in( :useYn)" +
            "              AND tu.DEL_YN = 'N' AND tu.SYS_YN = 'N' ORDER BY UFN_DEC_AES(tu.user_nm);";

    @Query(nativeQuery = true,value = USER_DEPT_QUERY)
    List <UserEntity> getUserDept(@Param("deptId") int deptId,@Param("useYn") List<String> useYn);

    @Query(nativeQuery = true,value = USER_QUERY)
    List <UserEntity> getUserAll(@Param("useYn") List<String> useYn);

    @Query(nativeQuery = true,value = USER_MATCH_DEPT_QUERY)
    List <UserEntity> getUserMatchDept(@Param("deptId") int deptId,@Param("useYn") List<String> useYn);
}
