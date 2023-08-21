package com.sensorsdata.analytics.android.test.utils;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.view.Gravity;
import android.widget.Toast;

import com.alibaba.fastjson.JSON;
import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.JsonRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManagerFactory;

public class Common {
    //跳转到那类功能的节目
    public static String INTENT_TYPE="type";
    public static String LOG_MANUAL = "LOG_MANUAL.log";
    public static String LOG_AUTO = "LOG_AUTO.log";
    public static String WRONG_EVENT = "WRONG_EVENT.log";
    public static String CHANNEL_URL="https://lwq2017-data.debugbox.sensorsdata.cn/cb/installation_track?utm_source=111&utm_medium=222&utm_term=333&utm_content=444&utm_campaign=android&callbacks=y&_channel_app_id=com.sensorsdata.analytics.android.test&_channel_track_key=TTste2ep&project=default&channel_name=toutiao_track&os=__OS__&ip=__IP__&ua=__UA__&channel_account_id=__ADVERTISER_ID__&mac=__MAC__&channel_campaign_id=__CAMPAIGN_ID__&callback_url=__CALLBACK_URL__&channel_click_id=__REQUEST_ID__&channel_ad_id=__CID__&imei=__IMEI__&model=__MODEL__&android_id=__ANDROIDID__&oaid=__OAID__&channel_adgroup_id=__AID__";
//        public static String CHANNEL_URL="https://newsdktest.cloud.sensorsdata.cn:4006/cb/installation_track?utm_source=111&utm_medium=222&utm_term=333&utm_content=444&utm_campaign=test&_channel_track_key=nXR3Iu6u&token=5a394d2405c147ca&project=liuweiqiang&channel_name=toutiao_track&callback_url=__CALLBACK_URL__&os=__OS__&ip=__IP__&imei=__IMEI__&android_id=__ANDROID__&ua=__UA__&oaid=__OAID__&mac=__MAC__";
    public static String COPY_TEXT="https://qudong01.datasink.sensorsdata.cn/sd/wxL/5/sC3eLq";
    public static String DEEPLINK_URL="https://qudong01.datasink.sensorsdata.cn/sd/wxL/Ta/ri71ld";
    private static String TAG="SA.T";
    private static String[] keys={"$app_name","$device_id","$model","$brand","$os_version","$app_version","$timezone_offset","$manufacturer","$screen_height","$os","$screen_width","$lib_version","$lib","$app_id","$wifi","$network_type","$is_first_day"};
    private static String[] start_keys={"$resume_from_background","$is_first_time","$screen_name","$title"};
    private static String[] end_keys={"event_duration","$screen_name","$title"};
    private static String[] view_keys={"$url","$screen_name","$title"};
    private static String[] click_keys={"$element_type","$element_id","$screen_name","$title","$element_content"};
    private static String[] install_keys={"$ios_install_source"};
    private static String[] h5_keys={"$url","$latest_traffic_source_type","$latest_search_keyword","$latest_referrer"};
    private static String[] ab_keys={"$abtest_experiment_id","$abtest_experiment_group_id"};
    private static String[] config_keys={"$app_remote_config"};
    private static String[] channel_keys={"$is_channel_callback_event","$channel_device_info"};
    private static String[] launch_keys={"$deeplink_url"};
    private static String[] launchResult_keys={"$deeplink_url","$event_duration"};
    private static String[] leave_keys={"$screen_name","$title","$url","event_duration"};
    private static String[] display_keys={"$sf_plan_id","$sf_plan_strategy_id","$sf_msg_id","$sf_plan_type","$sf_channel_service_name","$sf_channel_category","$sf_platform_tag","$sf_lib_version","$sf_succeed"};
    private static String[] popClick_keys={"$sf_plan_id","$sf_plan_strategy_id","$sf_msg_id","$sf_plan_type","$sf_channel_service_name","$sf_channel_category","$sf_platform_tag","$sf_lib_version","$sf_msg_element_action","$sf_msg_element_type","$sf_msg_action_id"};


    //toast显示
    public static void toast(Context context,String string){
        Toast toast = Toast.makeText(context, string, Toast.LENGTH_LONG);
        toast.setGravity(Gravity.CENTER,0,0);
        toast.show();
    }
    //日志打印
    public static void logFile(String TAG,String API,String message){

    }


    //获取当前时间
    public static String getTime(){

        long currentTime=System.currentTimeMillis();
        SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        Date date=new Date(currentTime);
        String time=formatter.format(date);
//        Logger.i("时间是："+time);

        return time;
    }

    public static String getBigString(int length){
        StringBuffer stringBuffer=new StringBuffer();
        for (int i=0;i<length;i++){
            stringBuffer.append("s");
        }
        return stringBuffer.toString();
    }

    //对使用注解的页面添加该logcat提示
    public static void loge(String string){
        Log.e("Annotation",string);
    }

    //获取当前进程名
    public static String getProcessName() {
        try {
            File file = new File("/proc/" + android.os.Process.myPid() + "/" + "cmdline");
            BufferedReader mBufferedReader = new BufferedReader(new FileReader(file));
            String processName = mBufferedReader.readLine().trim();
            mBufferedReader.close();
            return processName;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //打开渠道链接
    public static void openUrl(Context context,String url){
        //调用手机浏览器,打开渠道链接
        Intent intent=new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
        Log.d("openChannelUrl", CHANNEL_URL);
    }

    //获取SSL_der证书
    public static SSLSocketFactory getSSL_DER(Context context){

        try {
            //构建 SSLSocketFactory 实例
            SSLSocketFactory sslSocketFactory ;
            CertificateFactory cf = CertificateFactory.getInstance("X.509");
            // 其中 R.raw.ca 是您这边自签证书的公钥
            InputStream in = context.getResources().openRawResource(R.raw.cert);
            Certificate ca = cf.generateCertificate(in);
            try {
                in.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
            KeyStore keystore = KeyStore.getInstance(KeyStore.getDefaultType());
            keystore.load(null, null);
            keystore.setCertificateEntry("ca", ca);
            String tmfAlgorithm = TrustManagerFactory.getDefaultAlgorithm();
            TrustManagerFactory tmf = TrustManagerFactory.getInstance(tmfAlgorithm);
            tmf.init(keystore);
            // Create an SSLContext that uses our TrustManager
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, tmf.getTrustManagers(), null);
            sslSocketFactory = sslContext.getSocketFactory();
            //将实例传入神策
            return sslSocketFactory;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }


    //获取bks证书
    public static SSLSocketFactory getSSL_BKS(Context context){
        try {
            KeyStore ks = KeyStore.getInstance("BKS");
            InputStream stream = context.getResources().openRawResource(R.raw.my);
            ks.load(stream, null);
            try {
                stream.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
            TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            trustManagerFactory.init(ks);
            SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(null, trustManagerFactory.getTrustManagers(), null);
            return sc.getSocketFactory();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //模拟耗时操作，单位 ms
    public static void workTime(long ms) {
        final long l = System.currentTimeMillis();
        while (System.currentTimeMillis() <= l + ms) {
        }
    }

    /** * 清除本应用所有数据库(/data/data/com.xxx.xxx/databases) * * @param context */
    public static void cleanDatabases(Context context) {
        deleteFilesByDirectory(new File("/data/data/"
                + context.getPackageName() + "/databases"));
    }

    /** * 删除方法 这里只会删除某个文件夹下的文件，如果传入的directory是个文件，将不做处理 * * @param directory */
    private static void deleteFilesByDirectory(File directory) {
        if (directory != null && directory.exists() && directory.isDirectory()) {
            for (File item : directory.listFiles()) {
                item.delete();
            }
        }
    }

    //渠道匹配测试代码
    public static void requestChannelUrl(Context context){
        String URL=CHANNEL_URL.replace("__ANDROIDID__", SensorsDataAPI.sharedInstance().getAnonymousId());
        Log.d("onResponse", "CHANNEL_URL:"+URL);
        RequestQueue queue= Volley.newRequestQueue(context);
        StringRequest request=new StringRequest(URL, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.d("onResponse", "response:"+response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("onResponse", "error:"+error.getMessage());
            }
        });
        queue.add(request);
    }


    //渠道匹配测试代码
    public static void seedMessage(Context context){
        RequestQueue queue= Volley.newRequestQueue(context);
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("msgtype","text");

            JSONObject object = new JSONObject();
            object.put("content","hello world");
            jsonObject.put("text",object);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        JsonRequest<JSONObject> jsonRequest = new JsonObjectRequest(Request.Method.POST,"https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=791336a0-e698-4628-883a-b81f140fc142", jsonObject,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        Log.d(TAG, "response -> " + response.toString());

                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e(TAG, error.getMessage(), error);
            }
        })
        {
            @Override
            public Map<String, String> getHeaders() {
                HashMap<String, String> headers = new HashMap<String, String>();
                headers.put("Accept", "application/json");
                headers.put("Content-Type", "application/json; charset=UTF-8");

                return headers;
            }
        };
        queue.add(jsonRequest);
    }

    //属性校验
    public static void assertEventProperties(Context context,String eventName, String properties){
        String message="eventName:"+eventName+",properties:"+properties;
        com.alibaba.fastjson.JSONObject jsonObject= JSON.parseObject(properties);
        for(String key:keys){
            //如果当前事件缺少预置属性key
            if (!jsonObject.containsKey(key)){
                //将当前事件写入到日志中
                Log.e(TAG,"当前事件："+eventName+" 校验失败,缺少属性:"+key);
                Log.e(TAG,message);
                //FileController.getFileControl().writeLogToFile(context,WRONG_EVENT,message);
                return;
            }
        }
        //对特殊事件进一步校验
        String[] special_keys=null;
        switch (eventName){
            case "$AppStart":
                special_keys=start_keys;
                break;
            case "$AppViewScreen":
                special_keys=view_keys;
                break;
            case "$AppClick":
                special_keys=click_keys;
                break;
            case "$AppEnd":
                special_keys=end_keys;
                break;
            case "$AppInstall":
                special_keys=install_keys;
                break;
            case "$ABTestTrigger":
                special_keys=ab_keys;
                break;
            case "$AppRemoteConfigChanged":
                special_keys=config_keys;
                break;
            case "$AppDeeplinkLaunch":
                special_keys=launch_keys;
                break;
            case "$AppDeeplinkMatchedResult":
                special_keys=launchResult_keys;
                break;
            case "testChannel":
                special_keys=channel_keys;
                break;
            case "$AppPageLeave":
                special_keys=leave_keys;
                break;
            case "$PlanPopupDisplay":
                special_keys=display_keys;
                break;
            case "$PlanPopupClick":
                special_keys=popClick_keys;
                break;

        }

        //符合以上特殊事件，对上述事件进一步校验
        if (special_keys!=null){
            for(String key:special_keys){
                //如果当前事件缺少预置属性key
                if (!jsonObject.containsKey(key)){
                    //将当前事件写入到日志中
                    Log.e(TAG,"当前事件："+eventName+" 校验失败,缺少属性:"+key);
                    Log.e(TAG,message);
                    //FileController.getFileControl().writeLogToFile(context,WRONG_EVENT,message);
                    return;
                }
            }
        }
        //如果是h5打通事件需要进一步校验
        if (jsonObject.getString("$lib").equals("js")){
            for(String key:h5_keys){
                //如果当前事件缺少预置属性key
                if (!jsonObject.containsKey(key)){
                    //将当前事件写入到日志中
                    Log.e(TAG,"当前事件："+eventName+" 校验失败,缺少属性:"+key);
                    Log.e(TAG,message);
                    //FileController.getFileControl().writeLogToFile(context,WRONG_EVENT,message);
                    return;
                }
            }
        }
        Log.d(TAG, "事件: "+eventName+" 属性校验通过!");
    }

    //属性校验
//    public static void assertProperties(SAPropertyFilter filter){
//        //如果是事件类型数据
//        if (filter.getType().toString().contains("TRACK")){
//            String eventName=filter.getEvent();
//            com.alibaba.fastjson.JSONObject properties= JSON.parseObject(filter.getProperties().toString());
//            for(String key:keys){
//                //如果当前事件缺少预置属性key
//                if (!properties.containsKey(key)){
//                    //将当前事件写入到日志中
//                    Log.e(TAG,"当前事件："+eventName+" 校验失败,缺少属性:"+key);
//                    return;
//                }
//            }
//            //对特殊事件进一步校验
//            String[] special_keys=null;
//            switch (eventName){
//                case "$AppStart":
//                    special_keys=start_keys;
//                    break;
//                case "$AppViewScreen":
//                    special_keys=view_keys;
//                    break;
//                case "$AppClick":
//                    special_keys=click_keys;
//                    break;
//                case "$AppEnd":
//                    special_keys=end_keys;
//                    break;
//                case "$AppInstall":
//                    special_keys=install_keys;
//                    break;
//                case "$ABTestTrigger":
//                    special_keys=ab_keys;
//                    break;
//                case "$AppRemoteConfigChanged":
//                    special_keys=config_keys;
//                    break;
//                case "$AppDeeplinkLaunch":
//                    special_keys=launch_keys;
//                    break;
//                case "$AppDeeplinkMatchedResult":
//                    special_keys=launchResult_keys;
//                    break;
//                case "testChannel":
//                    special_keys=channel_keys;
//                    break;
//                case "$AppPageLeave":
//                    special_keys=leave_keys;
//                    break;
//                case "$PlanPopupDisplay":
//                    special_keys=display_keys;
//                    break;
//                case "$PlanPopupClick":
//                    special_keys=popClick_keys;
//                    break;
//
//            }
//
//            //符合以上特殊事件，对上述事件进一步校验
//            if (special_keys!=null){
//                for(String key:special_keys){
//                    //如果当前事件缺少预置属性key
//                    if (!properties.containsKey(key)){
//                        //将当前事件写入到日志中
//                        Log.e(TAG,"当前事件："+eventName+" 校验失败,缺少属性:"+key);
//                        return;
//                    }
//                }
//            }
//            //如果是h5打通事件需要进一步校验
//            if (properties.getString("$lib").equals("js")){
//                for(String key:h5_keys){
//                    //如果当前事件缺少预置属性key
//                    if (!properties.containsKey(key)){
//                        //将当前事件写入到日志中
//                        Log.e(TAG,"当前事件："+eventName+" 校验失败,缺少属性:"+key);
//                        return;
//                    }
//                }
//            }
//            Log.d(TAG, "事件: "+eventName+" 属性校验通过!");
//        }
//
//        //如果是 profile_x
//        if (filter.getType().toString().contains("profile")){
//        }
//        //如果是 item_x
//        if (filter.getType().toString().contains("item")){
//        }
//    }



}
