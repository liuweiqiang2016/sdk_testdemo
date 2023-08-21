package com.sensorsdata.analytics.android.test.utils;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;

import org.json.JSONObject;

import java.util.Map;
import java.util.Set;

public class Users {


    private String TAG="Users_test";


    //获取当前用户的匿名ID
    public String getAnonymousId(){

        String anonymousId = SensorsDataAPI.sharedInstance().getAnonymousId();

        return anonymousId;
    }

    //重置匿名ID
    public void resetAnonymousId(){
        SensorsDataAPI.sharedInstance().resetAnonymousId();

    }

    //替换匿名ID
    public void identify(String distinctId){

        SensorsDataAPI.sharedInstance().identify(distinctId);


    }


    //获取当前用户的distinctId
    public String getDistinctId(){

        String distinctId = SensorsDataAPI.sharedInstance().getDistinctId();
        return distinctId;

    }

    //用户关联
    public void login(String id){

        SensorsDataAPI.sharedInstance().login(id);
    }

    //用户关联-带属性
    public void login_properties(String id, JSONObject properties){

        SensorsDataAPI.sharedInstance().login(id,properties);

    }

    //获取当前用户loginId
    public String getLoginId() {
        String loginId = SensorsDataAPI.sharedInstance().getLoginId();
        return loginId;
    }

    //取消用户关联
    public void logout(){

        SensorsDataAPI.sharedInstance().logout();
    }

    //设置用户属性
    public void profileSet(JSONObject properties){

        SensorsDataAPI.sharedInstance().profileSet(properties);
    }

    //设置用户属性-键值对
    public void profileSet_kv(String key,Object value){

        SensorsDataAPI.sharedInstance().profileSet(key,value);
    }


    //删除用户属性
    public void profileUnset(String property){
        SensorsDataAPI.sharedInstance().profileUnset(property);

    }


    //用户首次属性
    public void profileSetOnce(JSONObject properties){
        SensorsDataAPI.sharedInstance().profileSetOnce(properties);

    }

    public void profileSetOnce_kv(String key,Object value){

        SensorsDataAPI.sharedInstance().profileSetOnce(key,value);

    }

    //用户int属性累加
    public void profileIncrement(String key,Number value){

        SensorsDataAPI.sharedInstance().profileIncrement(key,value);
    }

    public void profileIncrement_map(Map map){

        SensorsDataAPI.sharedInstance().profileIncrement(map);
    }

    //追加用户属性
    public void profileAppend(String key,String value){
        SensorsDataAPI.sharedInstance().profileAppend(key, value);
    }

    public void profileAppend_set(String key, Set values){
        SensorsDataAPI.sharedInstance().profileAppend(key,values);
    }


    //删除用户属性
    public void profileDelete(){
        SensorsDataAPI.sharedInstance().profileDelete();
    }

    public void profilePushId(String key,String pushId){
        SensorsDataAPI.sharedInstance().profilePushId(key, pushId);
    }


    //item相关
    //设置item
    public void itemSet(String itemType,String itemId,JSONObject properties){
        SensorsDataAPI.sharedInstance().itemSet(itemType, itemId, properties);
    }

    //删除item
    public void itemDelete(String itemType,String itemId){

        SensorsDataAPI.sharedInstance().itemDelete(itemType, itemId);
    }

}
