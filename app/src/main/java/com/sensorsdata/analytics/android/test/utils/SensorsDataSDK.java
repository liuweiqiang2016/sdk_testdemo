package com.sensorsdata.analytics.android.test.utils;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.nfc.Tag;
import android.util.Log;

import com.alibaba.fastjson.JSONArray;
import com.sensorsdata.abtest.SensorsABTest;
import com.sensorsdata.abtest.SensorsABTestConfigOptions;
import com.sensorsdata.analytics.android.sdk.SAConfigOptions;
import com.sensorsdata.analytics.android.sdk.SensorsAnalyticsAutoTrackEventType;
import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.sdk.SensorsDataDynamicSuperProperties;
import com.sensorsdata.analytics.android.sdk.SensorsDataTrackEventCallBack;
import com.sensorsdata.analytics.android.sdk.SensorsNetworkType;
//import com.sensorsdata.analytics.android.sdk.deeplink.SADeepLinkObject;
import com.sensorsdata.analytics.android.sdk.deeplink.SensorsDataDeepLinkCallback;
//import com.sensorsdata.analytics.android.sdk.deeplink.SensorsDataDeferredDeepLinkCallback;
import com.sensorsdata.analytics.android.sdk.listener.SAEventListener;
import com.sensorsdata.analytics.android.sdk.listener.SAFunctionListener;
import com.sensorsdata.analytics.android.sdk.plugin.encrypt.SAEncryptStorePlugin;
import com.sensorsdata.analytics.android.sdk.util.SensorsDataUtils;
import com.sensorsdata.analytics.android.test.activity.DialogActivity;
import com.sensorsdata.analytics.android.test.service.AssertService;
import com.sensorsdata.sf.core.SFConfigOptions;
import com.sensorsdata.sf.core.SensorsFocusAPI;
import com.sensorsdata.sf.core.entity.SFCampaign;
import com.sensorsdata.sf.ui.listener.PopupListener;
import com.sensorsdata.sf.ui.listener.SensorsFocusCampaignListener;
import com.sensorsdata.sf.ui.view.SensorsFocusActionModel;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.InetSocketAddress;
import java.net.Proxy;
import java.util.HashMap;
import java.util.Map;


public class SensorsDataSDK {

    private static String NEW_SERVER_URL="https://newsdktest.datasink.sensorsdata.cn/sa?project=liuweiqiang&token=5a394d2405c147ca";
    private static String DEEPLINK_SERVER_URL="https://qudong01.datasink.sensorsdata.cn/sa?project=demo&token=65385698bb3f1e78";
    private static String VIS_SERVER_URL="http://vis.product.debugbox.sensorsdata.cn:8106/sa?project=default";
    private static String SF_SERVER_URL="https://demopaassink.focus.sensorsdata.cn/sa?project=default";
    private static String AB_SERVER_URL="http://10.130.6.4:8106/sa?project=default";
    private static String TEST_SERVER_URL="http://10.120.73.51:8106/sa?project=default";
    private static String SF_BASEURL_DEMOFOCUS="http://demosaas.focus.sensorsdata.cn/api/v2";

    static String TAG="SA.S:App";

    public static void initSDK(Context context){
        initSA(context);
//        initSF(context);
//        initABTesting(context);
    }

    public static void initSA(Context context){
        Log.e("SASDK", "init:========================================== ");
//        SAConfigOptions saConfigOptions=new SAConfigOptions(TEST_SERVER_URL);
//        SAConfigOptions saConfigOptions=new SAConfigOptions("http://10.120.111.143:8106/sa?project=default");
        SAConfigOptions saConfigOptions=new SAConfigOptions("http://10.129.20.62:8106/sa?project=liuweiqiang");
//        saConfigOptions.disableSDK(true);
//        SAConfigOptions saConfigOptions=new SAConfigOptions("https://satdemo04-data.debugbox.sensorsdata.cn/sa?project=default");
//        saConfigOptions.setCustomAdChannelUrl("https://satdemo04-slink04.debugbox.sensorsdata.cn");
//        saConfigOptions.enableAutoAddChannelCallbackEvent(true);
//        SAConfigOptions saConfigOptions=new SAConfigOptions(NEW_SERVER_URL);
//        saConfigOptions.enableSaveDeepLinkInfo(true);
//        saConfigOptions.enableDataManagerService();
//        Proxy proxy = new Proxy(Proxy.Type.HTTP, InetSocketAddress.createUnresolved("172.21.4.152", 8888));
//        saConfigOptions.setProxy(proxy);
//        saConfigOptions.disableRandomTimeRequestRemoteConfig();
        saConfigOptions.enableTrackPush(true);
        saConfigOptions.enableLog(true);
//        saConfigOptions.disableDeviceId();
//        saConfigOptions.enableSession(true);
//        saConfigOptions.setLoginIDKey("aaa");
//        saConfigOptions.enableSaveDeepLinkInfo(true);
//        saConfigOptions.enableTrackPageLeave(true,true);
//        saConfigOptions.disableSDK(true);
//        saConfigOptions.setMinRequestInterval(1);
//        saConfigOptions.setMaxRequestInterval(2);
        //设置为false,将不支持 API 17（Android 4.2)以下的版本
//        saConfigOptions.enableJavaScriptBridge(true);
        saConfigOptions.enableTrackPush(true);
//        saConfigOptions.enableHeatMap(true);
//        saConfigOptions.disableDeviceId();
//        saConfigOptions.enableSubProcessFlushData();
//        saConfigOptions.enableVisualizedAutoTrack(true);
//        saConfigOptions.enableVisualizedProperties(true);
//        saConfigOptions.enableSession(true);
//        saConfigOptions.disableAppEndTimer();
//        saConfigOptions.registerStorePlugin(new SAEncryptStorePlugin(context));
//        saConfigOptions.registerStorePlugin(new MyPlugin(context));
//        saConfigOptions.setAutoTrackEventType(SensorsAnalyticsAutoTrackEventType.APP_END);
//        saConfigOptions.setEventSessionTimeout(60*30);
        saConfigOptions.setAutoTrackEventType(SensorsAnalyticsAutoTrackEventType.APP_START|SensorsAnalyticsAutoTrackEventType.APP_CLICK|SensorsAnalyticsAutoTrackEventType.APP_VIEW_SCREEN|SensorsAnalyticsAutoTrackEventType.APP_END);
        saConfigOptions.setNetworkTypePolicy(SensorsNetworkType.TYPE_NONE);
//        saConfigOptions.enableEncrypt(true);
        saConfigOptions.enableTrackAppCrash();
//        saConfigOptions.enableTrackScreenOrientation(true);
//        saConfigOptions.enableSubProcessFlushData();
//        saConfigOptions.enableAutoAddChannelCallbackEvent()
        //自定义加密配置信息
//        saConfigOptions.registerStorePlugin(new SAEncryptStorePlugin(context));
//        saConfigOptions.registerStorePlugin(new SPPlugin(context));

//        saConfigOptions.enableVisualizedProperties(true);
//        saConfigOptions.enableTrackAppCrash();
//        saConfigOptions.enableTrackPush(true);
//        saConfigOptions.enableTrackPageLeave(true,true);
//        saConfigOptions.enableVisualizedAutoTrack(true);
//        saConfigOptions.setServerUrl();
//        saConfigOptions.disableDebugAssistant();
        //注册属性插件,校验事件中是否出现属性丢失
//        saConfigOptions.registerPropertyPlugin(new PropertyPlugin());
//        saConfigOptions.registerPropertyPlugin(new PropertyPlugin2());
//        saConfigOptions.registerPropertyPlugin(null);
        SensorsDataAPI.startWithConfigOptions(context,saConfigOptions);

        //SensorsDataUtils.getInternationalIdentifier(context);
//        SensorsDataAPI.sharedInstance().registerPropertyPlugin(new PropertyPlugin());
//        SensorsDataAPI.sharedInstance().identify("abc199");
        //设置 session 时间间隔
//        SensorsDataAPI.sharedInstance().setSessionIntervalTime(10*1000);
//        SensorsDataAPI.sharedInstance().setGPSLocation(171,23,"gps");

//        SensorsDataAPI.disableSDK();
//        SensorsDataAPI.sharedInstance().enableDeepLinkInstallSource(true);
        //返回DeepLink配置信息
//        SensorsDataAPI.sharedInstance().setDeepLinkCallback(new SensorsDataDeepLinkCallback() {
//            @Override
//            public void onReceive(String params, boolean success, long appAwakePassedTime) {
//                System.out.println("params:"+params);
//                System.out.println("success:"+success);
//                System.out.println("time:"+appAwakePassedTime);
//
//            }
//        });

//        SensorsDataAPI.sharedInstance().setDeepLinkCompletion(new SensorsDataDeferredDeepLinkCallback() {
//            @Override
//            public boolean onReceive(SADeepLinkObject saDeepLinkObject) {
//                return true;
//            }
//        });

        //开启 Fragment 页面浏览采集
        SensorsDataAPI.sharedInstance().trackFragmentAppViewScreen();
//        //校验事件中是否出现属性丢失
//        SensorsDataAPI.sharedInstance().setTrackEventCallBack(new SensorsDataTrackEventCallBack() {
//            @Override
//            public boolean onTrackEvent(String eventName, JSONObject properties) {
//                Intent intent=new Intent(context, AssertService.class);
//                intent.putExtra("eventName",eventName);
//                intent.putExtra("properties",properties.toString());
//                context.startService(intent);
//                return true;
//            }
//        });

//        SensorsDataAPI.sharedInstance().registerDynamicSuperProperties(new SensorsDataDynamicSuperProperties() {
//            @Override
//            public JSONObject getDynamicSuperProperties() {
//                JSONObject object=new JSONObject();
//                try {
//                    object.put("index",100);
//                } catch (JSONException e) {
//                    e.printStackTrace();
//                }
//                return object;
//            }
//        });

        JSONObject jsonObject=new JSONObject();
        try {
            jsonObject.put("index",666);
        } catch (JSONException e) {
            e.printStackTrace();
        }

       // SensorsDataAPI.sharedInstance().registerSuperProperties(jsonObject);

    }

    /*
     * 初始化弹窗 SDK
     * */
    public static void initSF(Context context){
        SFConfigOptions options=new SFConfigOptions(SF_BASEURL_DEMOFOCUS);
//        SFConfigOptions options=new SFConfigOptions("http://10.120.204.93:8107/api/v2");
//        options.preloadImage(false);
        options.setPopupListener(new PopupListener() {
            @Override
            public void onPopupLoadSuccess(String planId) {
                System.out.println("onPopupLoadSuccess:"+planId);
            }

            @Override
            public void onPopupLoadFailed(String planId, int errorCode, String errorMessage) {
                System.out.println("onPopupLoadFailed:"+planId);

            }

            @Override
            public void onPopupClick(String planId, SensorsFocusActionModel actionModel) {
                Intent intent=null;
                if ( actionModel==null) {
                    System.out.println("弹窗枚举类型为NULL!");
                    return;
                }
                switch (actionModel){
                    case OPEN_LINK:
                        System.out.println("onPopupClick-->link");
                        intent = new Intent(Intent.ACTION_VIEW, Uri.parse(actionModel.getValue()));
                        break;
                    case CUSTOMIZE:
                        System.out.println("onPopupClick-->customize");
                        try {
                            String value=actionModel.getExtra().getString("home");
//                            String value=actionModel.getExtra().getString("id");
                            intent = new Intent(context, Class.forName(value));

                        } catch (JSONException | ClassNotFoundException e) {
                            e.printStackTrace();
                        }
                        break;
                    case CLOSE:
                        System.out.println("onPopupClick-->close");
                        break;
                    case COPY:
                        System.out.println("onPopupClick-->copy:"+actionModel.getValue());
                        break;
                }
                if (intent!=null){
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    context.startActivity(intent);
                }
            }

            @Override
            public void onPopupClose(String planId) {
                System.out.println("onPopupClose:"+planId);

            }
        });


        options.setCampaignListener(new SensorsFocusCampaignListener() {
            @Override
            public boolean campaignShouldStart(SFCampaign sfCampaign) {
                System.out.println("campaignShouldStart----->"+sfCampaign.toString());
                return true;
            }

            @Override
            public void onCampaignStart(SFCampaign sfCampaign) {
                System.out.println("onCampaignStart----->"+sfCampaign.toString());
                String str=sfCampaign.getContent();
                JSONArray jsonArray = JSONArray.parseArray(str);
                com.alibaba.fastjson.JSONObject jsonObject=jsonArray.getJSONObject(0);
                if (jsonObject.getString("value").equals("lwq20210426")){
                    showCustomizedPOP(context);
                }
            }

            @Override
            public void onCampaignEnd(SFCampaign sfCampaign) {
                System.out.println("onCampaignEnd----->"+sfCampaign.toString());
            }

            @Override
            public void onCampaignFailed(SFCampaign sfCampaign, int i, String s) {
                System.out.println("onCampaignFailed----->"+sfCampaign.toString());
            }
        });
//        options.enablePopup(false);

//        Set<Class<?>> set=new HashSet<>();
//        set.add(HomeActivity.class);
//        set.add(ElementActivity.class);
//        options.setDelayPopupActivity(set);
        SensorsFocusAPI.startWithConfigOptions(context,options);
    }
    public static void initABTesting(Context context){
        SensorsABTestConfigOptions options=new SensorsABTestConfigOptions("http://10.130.6.5:8202/api/v2/abtest/online/results?project-key=438B9364C98D54371751BA82F6484A1A03A5155E");
//        SensorsABTestConfigOptions options=new SensorsABTestConfigOptions("http://10.120.103.57:8202/api/v2/abtest/online/results?project-key=03611F77720CB13DA4E8B726122D2EE2F95B7654");
        SensorsABTest.startWithConfigOptions(context,options);
//        Map<String,String> map=new HashMap<>();
//        map.put("custom_id","111");
//        map.put("aaa","222");
//        SensorsABTest.shareInstance().setCustomIDs(map);
//
//        SensorsABTest.shareInstance().fastFetchABTest(
//                SensorsABTestExperiment.newBuilder("ssss", -900)
////                        .addProperty("aaa","111")
//                        .setTimeoutMillSeconds(2000)
//                        .create(),
//                new OnABTestReceivedData<Integer>() {
//                    @Override
//                    public void onResult(Integer integer) {
//                        Log.e(TAG, "onResult: "+integer);
//
//                    }
//                }
//        );
//
//        SensorsABTest.shareInstance().fastFetchABTest(
//                SensorsABTestExperiment.newBuilder("qqqq", -200)
////                        .addProperty("aaa","222")
//                        .setTimeoutMillSeconds(2000)
//                        .create(),
//                new OnABTestReceivedData<Integer>() {
//                    @Override
//                    public void onResult(Integer integer) {
//                        Log.e(TAG, "onResult: "+integer);
//
//                    }
//                }
//        );

        //优先从本地读取试验信息，如果本地没有试验信息，再从网络发起
//        SensorsABTest.shareInstance().fastFetchABTest(
//                SensorsABTestExperiment.newBuilder("test_bb", -900)
//                        .addProperty("ab_str22","555")
//                        .setTimeoutMillSeconds(2000)
//                        .create(),
//                new OnABTestReceivedData<Integer>() {
//                    @Override
//                    public void onResult(Integer integer) {
//                        Log.e(TAG, "onResult: "+integer);
//
//                    }
//                }
//        );
//
//        //优先从本地读取试验信息，如果本地没有试验信息，再从网络发起
//        SensorsABTest.shareInstance().fastFetchABTest(
//                SensorsABTestExperiment.newBuilder("test_bb", -900)
//                        .addProperty("ab_str22","555")
//                        .setTimeoutMillSeconds(2000)
//                        .create(),
//                new OnABTestReceivedData<Integer>() {
//                    @Override
//                    public void onResult(Integer integer) {
//                        Log.e(TAG, "onResult: "+integer);
//
//                    }
//                }
//        );
//
//
//        SensorsABTest.shareInstance().fastFetchABTest(
//                SensorsABTestExperiment.newBuilder("test_aa", -200)
//                        .addProperty("ab_str22","bbb")
//                        .setTimeoutMillSeconds(2000)
//                        .create(),
//                new OnABTestReceivedData<Integer>() {
//                    @Override
//                    public void onResult(Integer integer) {
//                        Log.e(TAG, "onResult: "+integer);
//
//                    }
//                }
//        );
////
    }

    static void showCustomizedPOP(Context context) {
        Intent intent=new Intent(context, DialogActivity.class);
        context.startActivity(intent);
    }

}
