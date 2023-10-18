package com.cp.praha.consult.administrative.service;

import com.cp.praha.consult.administrative.service.request.ParamVO;
import com.cp.praha.consult.administrative.service.request.TrafficCommand;
import com.cp.praha.consult.administrative.service.response.EnvironmentVO;
import com.cp.praha.consult.administrative.service.response.WaterSupplyVO;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.jdbc.support.JdbcUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.StringReader;
import java.net.URI;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class AdministUtil {



    public String urlParamSetting(ParamVO param) throws Exception{
        String paramString = "";
        /**
         * false -> 값이 있을 경우에만 url에 &param, true -> 값이 없어도 url에 &param
         * 0번째 열 => param0,  1번째 열 -> param1, ...... 4번째 열 -> param4
         */
        boolean[][] requiredUrlParams = {
                {false, false, false, false, false}, //상하수도 수용가
                {false, false, false, false, false}, //상하수도 상세
                {false, false, false, false, false}, //지방세 미납
                {false, false, true, false, false}, //지방세 납부 param2
                {false, false, false, false, false}, //세외수입 미납
                {false, false, true, false, false}, //세외수입 납부 param2
                {false, false, true, false, true}, //환경개선부담금 미납 param2, param4
                {false, false, true, false, false}, //환경개선부담금 납부 param2
                {false, false, true, false, true}, //주정차 미납 param2, param4
                {false, false, true, false, false}, //주정차 납부 param2
        };

        boolean[] callUrlParamArr = requiredUrlParams[param.getRequiredUrlIndex()];

        if(callUrlParamArr[0]){
            paramString += "&param0="; //값이 없어도 세팅
            if(param.getParam0() != null && !param.getParam0().equals("")) paramString += param.getParam0();
        }else if(param.getParam0() != null && !param.getParam0().equals("")) paramString += "&param0=" + param.getParam0();

        if(callUrlParamArr[1]){
            paramString += "&param1="; //값이 없어도 세팅
            if(param.getParam1() != null && !param.getParam1().equals("")) paramString += param.getParam1();
        }else if(param.getParam1() != null && !param.getParam1().equals("")) paramString += "&param1=" + param.getParam1();

        if(callUrlParamArr[2]){
            paramString += "&param2="; //값이 없어도 세팅
            if(param.getParam2() != null && !param.getParam2().equals("")) paramString += param.getParam2();
        }else if(param.getParam2() != null && !param.getParam2().equals("")) paramString += "&param2=" + param.getParam2();

        if(callUrlParamArr[3]){
            paramString += "&param3="; //값이 없어도 세팅
            if(param.getParam3() != null && !param.getParam3().equals("")) paramString += param.getParam3();
        }else if(param.getParam3() != null && !param.getParam3().equals("")) paramString += "&param3=" + param.getParam3();

        if(callUrlParamArr[4]){
            paramString += "&param4="; //값이 없어도 세팅
            if(param.getParam4() != null && !param.getParam4().equals("")) paramString += param.getParam4();
        }else if(param.getParam4() != null && !param.getParam4().equals("")) paramString += "&param4=" + param.getParam4();


        return paramString;
    }

    /**
     * @param ip 행망 IP
     * @param url 요청 url
     * @param url 에 담을 파라미터
     * @return xml형태의 String
     */
    public String connectUrl(String ip, String url, ParamVO param) throws Exception {

        String param0 = "";
        String param1 = "";
        String param2 = "";
        String param3 = "";
        String param4 = "";

        if(param.getParam0() != null){
            param0 = URLDecoder.decode(param.getParam0(), "UTF-8");
        }
        if(param.getParam1() != null){
            param1 = URLDecoder.decode(param.getParam1(), "UTF-8");
        }
        if(param.getParam2() != null){
            param2 = URLDecoder.decode(param.getParam2(), "UTF-8");
        }
        if(param.getParam3() != null){
            param3 = URLDecoder.decode(param.getParam3(), "UTF-8");
        }
        if(param.getParam4() != null){
            param4 = URLDecoder.decode(param.getParam4(), "UTF-8");
        }

        URI uri = UriComponentsBuilder
                .fromUriString(ip)
                .path(url)
                .queryParam("param0", param0)
                .queryParam("param1", param1)
                .queryParam("param2", param2)
                .queryParam("param3", param3)
                .queryParam("param4", param4)
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplete = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<String>(uri.toString(), headers);

        ResponseEntity<String> response = restTemplete.exchange(uri, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }


    public String connectUrlWater(String ip, String url, WaterSupplyVO param) throws Exception {

        String suyNo = "";
        String fsuyno = "";
        String suyName = "";
        String suyName1 = "";
        String suySangho1 = "";
        String suyAddr1 = "";
        String suyAddr = "";
        String suyTelno = "";

        if(param.getSuyNo() != null){
            suyNo = URLDecoder.decode(param.getSuyNo(), "UTF-8");
        }
        if(param.getFsuyno() != null){
            fsuyno = URLDecoder.decode(param.getFsuyno(), "UTF-8");
        }
        if(param.getSuyName() != null){
            suyName = URLDecoder.decode(param.getSuyName(), "UTF-8");
        }
        if(param.getSuyName1() != null){
            suyName1 = URLDecoder.decode(param.getSuyName1(), "UTF-8");
        }
        if(param.getSuySangho1() != null){
            suySangho1 = URLDecoder.decode(param.getSuySangho1(), "UTF-8");
        }
        if(param.getSuyAddr1() != null){
            suyAddr1 = URLDecoder.decode(param.getSuyAddr1(), "UTF-8");
        }
        if(param.getSuyAddr() != null){
            suyAddr = URLDecoder.decode(param.getSuyAddr(), "UTF-8");
        }
        if(param.getSuyTelno() != null){
            suyTelno = URLDecoder.decode(param.getSuyTelno(), "UTF-8");
        }

        URI uri = UriComponentsBuilder
                .fromUriString(ip)
                .path(url)
                .queryParam("suyNo", suyNo)
                .queryParam("fsuyno", fsuyno)
                .queryParam("suyName", suyName)
                .queryParam("suyName1", suyName1)
                .queryParam("suySangho1", suySangho1)
                .queryParam("suyAddr1", suyAddr1)
                .queryParam("suyAddr", suyAddr)
                .queryParam("suyTelno", suyTelno)
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplete = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<String>(uri.toString(), headers);

        ResponseEntity<String> response = restTemplete.exchange(uri, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }

    /**
     * @param ip 행망 IP
     * @param url 요청 url
     * @param url 에 담을 파라미터
     * @return xml형태의 String
     */
    public String connectUrlTraffic(String ip, String url, TrafficCommand param) throws Exception {

        String lvyNo = "";
        String ownerNm ="";
        String bdngNm = "";

        if(param.getLvyNo() != null){
            lvyNo = URLDecoder.decode(param.getLvyNo(), "UTF-8");
        }
        if(param.getOwnerNm() != null){
            ownerNm = URLDecoder.decode(param.getOwnerNm(), "UTF-8");
        }
        if(param.getBdngNm() != null){
            bdngNm = URLDecoder.decode(param.getBdngNm(), "UTF-8");
        }

        URI uri = UriComponentsBuilder
                .fromUriString(ip)
                .path(url)
                .queryParam("lvyNo", lvyNo)
                .queryParam("ownerNm", ownerNm)
                .queryParam("bdngNm", bdngNm)
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplete = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<String>(uri.toString(), headers);

        ResponseEntity<String> response = restTemplete.exchange(uri, HttpMethod.GET, entity, String.class);

        return response.getBody();

    }

    public String connectUrlEnvironment(String ip, String url, EnvironmentVO param) throws Exception {

        String ownrSid = "";
        String beaMneyNo ="";

        if(param.getOwnrSid() != null){
            ownrSid = URLDecoder.decode(param.getOwnrSid(), "UTF-8");
        }
        if(param.getBeaMneyNo() != null){
            beaMneyNo = URLDecoder.decode(param.getBeaMneyNo(), "UTF-8");
        }

        URI uri = UriComponentsBuilder
                .fromUriString(ip)
                .path(url)
                .queryParam("ownrSid", ownrSid)
                .queryParam("beaMneyNo", beaMneyNo)
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplete = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<String>(uri.toString(), headers);

        ResponseEntity<String> response = restTemplete.exchange(uri, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }

    //string 형태의 xml -> document 객체
    public Document xmlToDocument(String xmlStringDatas) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        // 파싱 시작
        Document document = builder.parse(new InputSource(new StringReader(xmlStringDatas)));
        return document;
    }

    //document의 list 태그 객체 -> VO
    public Object documentToJson(NodeList listChildNodeList, Object VO){

        Map<String, String> Map = new HashMap<>();
        for(int j = 0; j < listChildNodeList.getLength(); j++) {
            Node childNode = listChildNodeList.item(j);
            if (childNode.getNodeType() == Node.ELEMENT_NODE) {
                // 해당 노드의 종류 판정(Element일 때)
                Element ele = (Element) childNode;
                String nodeName = ele.getNodeName(); //list 하위 태그의 태그명
                String value = ele.getTextContent(); //list 하위 태그의 text
                Map.put(nodeName, value);
            }
        }
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 없는 파라미터는 매핑X
        return mapper.convertValue(Map, VO.getClass()); //Map -> VO object 변환
    }

    //xml 태그가 대문자인 경우 camelCase로 변환
    public Object documentCamelCaseToJson(NodeList listChildNodeList, Object VO){

        Map<String, String> Map = new HashMap<>();
        for(int j = 0; j < listChildNodeList.getLength(); j++) {
            Node childNode = listChildNodeList.item(j);
            if (childNode.getNodeType() == Node.ELEMENT_NODE) {
                // 해당 노드의 종류 판정(Element일 때)
                Element ele = (Element) childNode;
                String nodeName = ele.getNodeName(); //list 하위 태그의 태그명
                String value = ele.getTextContent(); //list 하위 태그의 text
                Map.put(JdbcUtils.convertUnderscoreNameToPropertyName(nodeName), value);
            }
        }
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 없는 파라미터는 매핑X
        return mapper.convertValue(Map, VO.getClass()); //Map -> VO object 변환
    }

    /**
     * @return 상태코드 반환
     */
    public String getResultCode(Element root){
        Node node = root.getElementsByTagName("resultCode").item(0);
        return node.getTextContent();
    }

}
