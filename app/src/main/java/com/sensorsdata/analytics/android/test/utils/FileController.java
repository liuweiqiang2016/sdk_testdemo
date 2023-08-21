package com.sensorsdata.analytics.android.test.utils;

import android.Manifest;
import android.content.Context;
import android.os.Build;
import android.os.Environment;
import android.util.Log;

import com.sensorsdata.analytics.android.test.activity.ViewActivity;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import pub.devrel.easypermissions.EasyPermissions;

public class FileController {

    private Context mContext;

    private ArrayList<String> list=new ArrayList<>();
    private volatile static FileController m_instance;
    private FileController(){
    }

    public static synchronized FileController getFileControl() {
        if (m_instance == null) {
            m_instance = new FileController();
//            synchronized (m_instance) {
//                if (m_instance == null) {
//                    m_instance = new FileController();
//                }
//            }
        }
        return m_instance;
    }

    public void init(Context context) {
        mContext = context;
    }


    public void deleteLogFile(String fileName){
        try {
            File file = new File(mContext.getFilesDir(), fileName);

            if(file.exists()){
                file.delete();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public ArrayList<String> readLogFromFile(String fileName) {
        File file = new File(Environment.getExternalStorageDirectory(), fileName);
        BufferedReader br = null;
        if(!file.exists())
            return null;
        try {
            br = new BufferedReader(new FileReader(file));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        try {
            if (list!=null){
                list.clear();
            }
            String line = br.readLine();

            while (line != null) {
                list.add(line);
                line = br.readLine();
            }
            br.close();
            return list;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            return list;
        }
    }


    /*
     * 向本地写入日志信息
     * */
    public void writeLogToFile(Context context,String fileName,String message) {
        //判断是否拥有写入权限
        if (Build.VERSION.SDK_INT>=Build.VERSION_CODES.M){
            if(!EasyPermissions.hasPermissions(context, Manifest.permission.WRITE_EXTERNAL_STORAGE)){
                //若没有写入权限，停止写入
                Log.e("SA.S", "没有写入权限，写入异常日志失败！");
                return;
            }
        }
        String time=Common.getTime();
        String msg=time+"\n"+message+"\n";
        FileOutputStream outputStream = null;
        try {
            File file = new File(Environment.getExternalStorageDirectory(), fileName);
            outputStream = new FileOutputStream(file,true);
            if (!file.exists()) {
                file.createNewFile();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            outputStream.write(msg.getBytes());
            outputStream.flush();
            outputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /*
    * 写日志的方法
    * time：系统当前时间
    * api：所测试的接口名称
    * param：所传的参数，无参默认为null,多个参数用","分割，例如："eventName，properties"
    * response：接口返回值，无返回默认为null
    * */
    public void writeToLogFile(String api,String param,String response,String fileName) {
        String time=Common.getTime();
        if (param==null){
            param="无参数";
        }
        if (response==null){
            response="无返回";
        }
        String s=time+"\n"+api+"\n"+param+"\n"+response+"\n";
        if (s == null) return;
        FileOutputStream outputStream = null;
        try {
            File file = new File(Environment.getExternalStorageDirectory(), fileName);
            outputStream = new FileOutputStream(file,true);

            if (!file.exists()) {
                file.createNewFile();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            outputStream.write(s.getBytes());
            outputStream.flush();
            outputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void writeAutoTestLog(List<String> list){
        if (list==null) return;
        //使用stringBuffer,提升性能
        StringBuffer stringBuffer=new StringBuffer();
        for(String str:list){
            stringBuffer.append(str);
            stringBuffer.append("\n");
            stringBuffer.append("---------------------------------------------");
            stringBuffer.append("\n");
        }
        String s=stringBuffer.toString();
        FileOutputStream outputStream = null;
        try {
            File file = new File(Environment.getExternalStorageDirectory(), Common.LOG_AUTO);
            outputStream = new FileOutputStream(file, false); // will overwrite existing data
            if (!file.exists()) {
                file.createNewFile();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            outputStream.write(s.getBytes());
            outputStream.flush();
            outputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    //读取本地网页，以String类型返回网页数据
    public String getHtmlData(Context mContext,String fileName){
        InputStream is = null;
        String result="";
        try {
            is = mContext.getAssets().open(fileName);
            int lenght = is.available();
            byte[]  buffer = new byte[lenght];
            is.read(buffer);
            result = new String(buffer, "utf8");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

}
