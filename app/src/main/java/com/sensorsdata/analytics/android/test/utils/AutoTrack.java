package com.sensorsdata.analytics.android.test.utils;

import com.sensorsdata.analytics.android.sdk.SensorsAnalyticsAutoTrackEventType;
import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
//import com.sensorsdata.analytics.android.sdk.internal.beans.AutoTrackEventType;

import java.util.List;
import java.util.Set;

public class AutoTrack {

    private String TAG="AutoTrack";



    //eventList开启全埋点
    public void enableAuto(List list){
        SensorsDataAPI.sharedInstance().enableAutoTrack(list);

    }


    //过时方式开启全埋点
    public void enableAuto_old(){
//        SensorsDataAPI.sharedInstance().enableAutoTrack();

    }


    //关闭某一系列事件的埋点
    public void disableAuto(List list){
        SensorsDataAPI.sharedInstance().disableAutoTrack(list);

    }


    //忽略某一系列事件的埋点
    public void ignoreAuto(List list){
//        SensorsDataAPI.sharedInstance().ignoreAutoTrackEventType(list);

    }

    //判断是否开启全埋点
    public Object isAutoTrack(){
        return SensorsDataAPI.sharedInstance().isAutoTrackEnabled();

    }

    //判断某个eventType是否被忽略
    public Object isEventTypeIgnore_int(int typeNumer){

        return SensorsDataAPI.sharedInstance().isAutoTrackEventTypeIgnored(typeNumer);
    }




    //开启appEnd事件采集才有效
    //设置Session间隔时间
    public void setSessionTime(int time){
        SensorsDataAPI.sharedInstance().setSessionIntervalTime(time);

    }

    //获取Session时间间隔
    public int getSessionTime(){
        return SensorsDataAPI.sharedInstance().getSessionIntervalTime();
    }



    //activity可同时采集点击事件和浏览事件
    //开启activity的页面浏览事件
    public void trackviewActivity(Class activity){
        SensorsDataAPI.sharedInstance().trackViewScreen(activity);
    }


    //忽略某个activity的浏览和点击
    public void ignoreActivity(Class activity){

        SensorsDataAPI.sharedInstance().ignoreAutoTrackActivity(activity);
    }

    //忽略一系列activity的页面点击和浏览
    public void ignoreActivity(List activityList){

        SensorsDataAPI.sharedInstance().ignoreAutoTrackActivities(activityList);
    }

    //某activity是否忽略浏览事件
    public Object isActivityIgnore_appViewScreen(Class activity){

        return SensorsDataAPI.sharedInstance().isActivityAutoTrackAppViewScreenIgnored(activity);
    }

    //某activity是否忽略点击事件
    public Object isActivityIgnore_appClick(Class activity){
        return SensorsDataAPI.sharedInstance().isActivityAutoTrackAppClickIgnored(activity);

    }

    //恢复某activity的采集
    public void resumeActivity(Class activity){
        SensorsDataAPI.sharedInstance().resumeAutoTrackActivity(activity);
    }

    //恢复一些列activity的采集
    public void resumeActivities(List activityList){

        SensorsDataAPI.sharedInstance().resumeAutoTrackActivities(activityList);
    }



    //fragment只有浏览事件
    //开启某个fragment的页面浏览事件
    public void trackviewFragment(Object fragment){
        SensorsDataAPI.sharedInstance().trackViewScreen(fragment);
    }

    //开启所有fragment的事件采集
    public void fragmentAppviewScreen(){
        SensorsDataAPI.sharedInstance().trackFragmentAppViewScreen();
    }

    //是否开启了所有fragment页面浏览事件
    public Boolean isFragmentAutoTrack(){
        return SensorsDataAPI.sharedInstance().isTrackFragmentAppViewScreenEnabled();
    }

    //开启某个fragment的采集
    public void enableFragment_class(Class fragment){

        SensorsDataAPI.sharedInstance().enableAutoTrackFragment(fragment);
    }

    //开启某个fragment的采集
    public void enableFragment_string(String fragmentName){
        //fragment所在路径的全路径,v3.2.6起删除该接口
//        SensorsDataAPI.sharedInstance().enableAutoTrackFragment(fragmentName);
    }


    //开启一系列fragment的采集
    public void enableFragment_list(List fragmentList){

        SensorsDataAPI.sharedInstance().enableAutoTrackFragments(fragmentList);
    }

    //获取已开启的fragment
    public Set<Integer> getFragments(){
        //v3.2.6起删除该接口
//        return SensorsDataAPI.sharedInstance().getAutoTrackFragments();
        return null;
    }

    //某个fragment是否开启了采集
    public Boolean isFragmentTrack(Class fragment){
        return SensorsDataAPI.sharedInstance().isFragmentAutoTrackAppViewScreen(fragment);
    }




    //RN只有点击事件
    //开启RN的自动采集
    public void enableRN(){
//        SensorsDataAPI.sharedInstance().enableReactNativeAutoTrack();
    }

    //是否开启了RN自动采集
    public Object isRNautoTrack(){
        return "";
    }

}
