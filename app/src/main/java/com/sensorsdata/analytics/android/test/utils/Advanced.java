package com.sensorsdata.analytics.android.test.utils;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.sdk.SensorsDataTrackEventCallBack;

import org.json.JSONObject;

import javax.net.ssl.SSLSocketFactory;

public class Advanced implements SensorsDataTrackEventCallBack{


    //设置url
    public void setServerUrl(String url){

        SensorsDataAPI.sharedInstance().setServerUrl(url);

    }

    //开启crash采集
    public void enableTrackAppCrash(){
//        SensorsDataAPI.sharedInstance().trackAppCrash();


    }

    //是否开启屏幕方向采集
    public void enableTrackScreenOrientation(boolean enable){
        SensorsDataAPI.sharedInstance().enableTrackScreenOrientation(enable);

    }

    //暂停屏幕采集
    public void stopTrackScreenOrientation(){
        SensorsDataAPI.sharedInstance().stopTrackScreenOrientation();

    }

    //恢复屏幕采集
    public void resumeTrackScreenOrientation(){
        SensorsDataAPI.sharedInstance().resumeTrackScreenOrientation();
    }

    //获取当前屏幕方向
    public String getScreenOrientation(){

        String screen=SensorsDataAPI.sharedInstance().getScreenOrientation();
        return screen;
    }

    //设置经纬度信息
    public void setGPSLocation(double la,double lt){

        SensorsDataAPI.sharedInstance().setGPSLocation(la,lt);
    }

    //清除GPS信息
    public void clearGPS(){
        SensorsDataAPI.sharedInstance().clearGPSLocation();

    }

    //是否开启调试日志
    public void enableLog(boolean enable){
        SensorsDataAPI.sharedInstance().enableLog(enable);
    }

    //是否开启了debug模式
    public boolean isDebug(){
        return SensorsDataAPI.sharedInstance().isDebugMode();
    }

    //设置自签证书
    public void setSSLSocketFactory(SSLSocketFactory sslSocketFactory){
        //调整到SAConfigOptions
//        SensorsDataAPI.sharedInstance().setSSLSocketFactory(sslSocketFactory);
    }


    //设置cookie
    public void setCookie(String cookie,boolean encode){

        SensorsDataAPI.sharedInstance().setCookie(cookie, encode);
    }

    //获取设置的cookie
    public String getCookie(boolean decode){

        return SensorsDataAPI.sharedInstance().getCookie(decode);
    }

    //获取主进程名
    public String getMainProcessName(){
        //v5.1.4 去除
        //return SensorsDataAPI.sharedInstance().getMainProcessName();
        return "";
    }

    //获取lastScreenurl
    public String getLastScreenUrl(){
        return SensorsDataAPI.sharedInstance().getLastScreenUrl();
    }

    //清除lastScreenurl
    public void clearLastScreen(){
        SensorsDataAPI.sharedInstance().clearLastScreenUrl();
    }

    //获取最后一个页面track属性
    public JSONObject getLastScreenTrackProperties(){
       return SensorsDataAPI.sharedInstance().getLastScreenTrackProperties();
    }

    //渠道追踪
    public void trackinstallation(String eventName) {

        SensorsDataAPI.sharedInstance().trackInstallation(eventName);
    }


    public void trackinstallation(String eventName,JSONObject properties) {

        SensorsDataAPI.sharedInstance().trackInstallation(eventName, properties);

    }

    public void trackinstallation(String eventName,JSONObject properties,boolean disablecallback) {

        SensorsDataAPI.sharedInstance().trackInstallation(eventName, properties,disablecallback);

    }

    public void trackChannelEvent(String eventName,JSONObject properties){

        SensorsDataAPI.sharedInstance().trackChannelEvent(eventName,properties);

    }

    public void trackSignUp(String distinctid){

//        SensorsDataAPI.sharedInstance().trackSignUp(distinctid);
    }

    public void trackSignUp(String distinctid,JSONObject properties){

//        SensorsDataAPI.sharedInstance().trackSignUp(distinctid, properties);

    }


    //回调监听
    public void setTrackEventCallBack(SensorsDataTrackEventCallBack callBack){
        SensorsDataAPI.sharedInstance().setTrackEventCallBack(callBack);

    }


    @Override
    public boolean onTrackEvent(String eventName, JSONObject eventProperties) {
        return false;
    }
}
