package com.rkjh.common.util;

import org.json.JSONObject;
import org.springframework.web.servlet.ModelAndView;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.Date;

/**
 * 作者：陈钊
 * 时间：2014/05/22.
 * 功能：对外输出类
 */
public class OutClass {
    public static ModelAndView outPutJson (int code, String message)
    {
        JSONObject result = new JSONObject();
        result.put("code", code);
        result.put("message", message);
        return new ModelAndView("json", "j", result.toString());
    }


}
