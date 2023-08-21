package com.sensorsdata.analytics.android.test;

import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Build;
import android.os.SystemClock;
import android.support.multidex.MultiDex;
import android.text.TextUtils;
import android.util.Log;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.alibaba.fastjson.JSONArray;
import com.sensorsdata.abtest.SensorsABTest;
import com.sensorsdata.abtest.SensorsABTestConfigOptions;
import com.sensorsdata.analytics.android.sdk.SAConfigOptions;
import com.sensorsdata.analytics.android.sdk.SensorsAnalyticsAutoTrackEventType;
import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.sdk.SensorsDataTrackEventCallBack;
import com.sensorsdata.analytics.android.sdk.SensorsNetworkType;
import com.sensorsdata.analytics.android.sdk.core.business.exposure.SAExposureConfig;
import com.sensorsdata.analytics.android.sdk.deeplink.SensorsDataDeepLinkCallback;
import com.sensorsdata.analytics.android.sdk.encrypt.IPersistentSecretKey;
import com.sensorsdata.analytics.android.sdk.encrypt.SecreteKey;
//import com.sensorsdata.analytics.android.sdk.util.SASpUtils;
import com.sensorsdata.analytics.android.sdk.plugin.encrypt.SAEncryptStorePlugin;
import com.sensorsdata.analytics.android.test.activity.DialogActivity;
import com.sensorsdata.analytics.android.test.activity.ViewActivity;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.PropertyPlugin;
import com.sensorsdata.analytics.android.test.utils.SensorsDataSDK;
import com.sensorsdata.sf.core.SFConfigOptions;
import com.sensorsdata.sf.core.SensorsFocusAPI;
import com.sensorsdata.sf.core.entity.SFCampaign;
import com.sensorsdata.sf.ui.listener.PopupListener;
import com.sensorsdata.sf.ui.listener.SensorsFocusCampaignListener;
import com.sensorsdata.sf.ui.view.SensorsFocusActionModel;
import com.tencent.smtt.sdk.QbSdk;
import com.tencent.smtt.sdk.TbsListener;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;


public class MyApplication extends Application {

    private String SA_SERVER_URL="https://newsdktest.datasink.sensorsdata.cn/sa?project=liuweiqiang&token=5a394d2405c147ca";
    private String SA_ENCRYPT_URL="http://10.129.130.64:8106/sa?project=default&token=schemaLimited-SLyd26fB";
    //弹窗环境
    private String SA_SERVERURL_DEMOFOCUS="https://demosink.focus.sensorsdata.cn/sa?project=default";

    private String SA_DEEPLINK_URL = "https://qudong01.datasink.sensorsdata.cn/sa?project=demo&token=65385698bb3f1e78";
    private String SA_VIS_SERVER_URL="http://vis.product.debugbox.sensorsdata.cn:8106/sa?project=default";
    private String SA_AB_SERVER_URL="http://10.120.152.3:8106/sa?project=default";
    private String TAG="SA.S";
    private String SA_SSL_SERVER_URL="https://ljy.test.ssl.cn:443/sa?project=liuweiqiang&token=5a394d2405c147ca";
    private SAConfigOptions saConfigOptions;

    @Override
    public void onCreate() {
        super.onCreate();
//        initSp();
        //初始化x5
//        initX5();
        //根据app启动次数，确定开启哪种全埋点
//        openAutoTrackByCount();
        //开启启动方法性能采集
//        Debug.startMethodTracing();
//        SASDK.init(this);
        //初始化 SA SDK
        if (isAgree()){
            SensorsDataSDK.initSA(this);
//            SensorsDataSDK.initSDK(this);
        }
        //结束启动方法性能采集,最终生成的.trace文件存放在 /Android/data/应用包名/files/dmtrace.trace
//        Debug.stopMethodTracing();

//        testCallBack();
//        testInit();

    }

    //修复低版本手机方法数超过65535的异常
    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);

//        SASpUtils.setSharedPreferencesProvider(new SASpUtils.ISharedPreferencesProvider() {
//            @Override
//            public SharedPreferences createSharedPreferences(Context context, String name, int mode) {
//                return getSharedPreferences("pwt",mode);
//            }
//        });

    }

    //测试初始化时间
    private String getDisplayName(TimeZone timezone){
        try{
            return timezone.getDisplayName(false,TimeZone.SHORT);
        }catch (Throwable e){
            e.printStackTrace();

        }
        return "";

    }


    //初始化sharePreference
    public void initSp(){
        for (String item:new String[]{"enableList","disableList","ignoreList"}){
            SharedPreferences sp=getSharedPreferences(item,0);
            SharedPreferences.Editor editor = sp.edit();
            editor.clear();
            editor.apply();
        }

    }

    /*
    * 根据app启动次数，进行位运算
    * */
    private int getValue(){
        SharedPreferences sp=getSharedPreferences("data", Context.MODE_PRIVATE);
        //从sp中获取app的启动次数
        int count=sp.getInt("count",0);
        //重置次数，保证count范围为（0-15）
        count=count%16;
        //转化为二进制
        String str2=Integer.toBinaryString(count);
        //将得到的二进制字符串补足4位,0000:从左到右每一位代表start、viewScreen、click、end
        while (str2.length()<4){
            str2="0"+str2;
        }
        Common.toast(this,str2);
        //将要开启的类型写入日志中
//        FileController.getFileControl().writeToLogFile("saConfigOptions.setAutoTrackEventType(value)",str2,null);
        //位元算计算
        int value=0,start,viewScreen,click,end;
        if (String.valueOf(str2.charAt(0)).equals("1")){
            start=SensorsAnalyticsAutoTrackEventType.APP_START;
        }else {
            start=0;
        }
        if (String.valueOf(str2.charAt(1)).equals("1")){
            viewScreen=SensorsAnalyticsAutoTrackEventType.APP_VIEW_SCREEN;
        }else {
            viewScreen=0;
        }
        if (String.valueOf(str2.charAt(2)).equals("1")){
            click=SensorsAnalyticsAutoTrackEventType.APP_CLICK;
        }else {
            click=0;
        }
        if (String.valueOf(str2.charAt(3)).equals("1")){
            end=SensorsAnalyticsAutoTrackEventType.APP_END;
        }else {
            end=0;
        }
        value=start|viewScreen|click|end;
        return value;
    }

    /*
    * 根据App的启动次数，开开启不同的全埋点组合类型
    * getValue()根据value，确定开启那些类型（value由位元算计算得到）
    * */
    private void openAutoTrackByCount(){
        SAConfigOptions saConfigOptions=new SAConfigOptions(SA_SERVER_URL);
        saConfigOptions.setAutoTrackEventType(getValue());
        saConfigOptions.enableLog(true);
        //开启自动收集，并开启调试日志
        SensorsDataAPI.startWithConfigOptions(this,saConfigOptions);
        //App启动完成后，存储启动次数
        saveCount();
    }

    /*
    * 存储app启动次数
    * */
    private void saveCount(){
        SharedPreferences sp=getSharedPreferences("data", Context.MODE_PRIVATE);
        int count=sp.getInt("count",0);
        SharedPreferences.Editor editor=sp.edit();
        editor.putInt("count",count+1);
        editor.apply();
    }

    /*
    * 初始化X5内核，可能比较慢，成功率堪忧，如果手机已安装qq浏览器、qq、微信，成功率相对较高，否则需要下载x5内核
    * 如果多次重启app，内核均加载失败，可采用以下步骤手动安装x5内核：
    * 1、目标x5页面的url，输入：http://debugtbs.qq.com
    * 2、点击"安装线上内核"
    * 3、等待安装成功，重启app，详细可参阅：http://soft.tbs.imtt.qq.com/17421/tbs_res_imtt_qqbrowser_x5_res_bradywwang_core_load_check.pdf
    *
    * 检测内核是否安装成功的方法，有两种方式：
    * 1、x5页面url,输入：http://soft.imtt.qq.com/browser/tes/feedback.html,页面显示的数字为0代表失败，大于0代表成功
    * 2、自定义X5WebView的drawChild()方法，会绘制设备名、设备型号、pid、内核名称，其中Sys Core代表失败，X5 Core代表成功，注释该方法，页面将不会绘制
    *
    * 备注：当项目中除了使用x5内核的jar文件，还使用了其他jar文件或者aar文件，可能会导致x5内核的jar逻辑无法获取到so文件，导致在64位的手机上出现初始化
    * 失败现象，详情可参阅：https://www.cnblogs.com/lovelyYakir/p/11126406.html
    * 对于本测试项目，由于使用了第三方的oaid的aar文件，导致x5内核在64位手机上初始化失败，因此测试x5核的H5打通前，需要注释掉oaid的aar文件
    * 不注释代码，也使用32位的手机测试H5打通（vivo xPlay，三星s7568),测试H5打通，务必保障对应的H5页面使用了x5内核，一个简单的方法：长按文本，会出现水滴选中
    *
    * */
    private void initX5() {

        QbSdk.PreInitCallback cb = new QbSdk.PreInitCallback() {
            @Override
            public void onViewInitFinished(boolean b) {
                System.out.println("状态:"+b);
                //x5內核初始化完成的回调，为true表示x5内核加载成功，否则表示x5内核加载失败，会自动切换到系统内核。
                if (b!= true) {
                    //设置自带webView属性
                    WebView webView = new WebView(getApplicationContext());
                    webView.getSettings().setJavaScriptEnabled(true);
                    webView.getSettings().setBlockNetworkImage(false);
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                        webView.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
                    }
                }
            }

            @Override
            public void onCoreInitFinished() {
            }
        };
        //流量下载内核
        QbSdk.setDownloadWithoutWifi(true);
        //x5内核初始化接口
        QbSdk.initX5Environment(getApplicationContext(), cb);
        QbSdk.setTbsListener(new TbsListener() {
            @Override
            public void onDownloadFinish(int i) {
                System.out.println("Download:"+i);
            }

            @Override
            public void onInstallFinish(int i) {
                System.out.println("Install:"+i);
            }

            @Override
            public void onDownloadProgress(int i) {
                System.out.println("Progress:"+i);
            }
        });
    }

    /*
    * 由于远程配置相关设置,在InitFragment不起作用,因此放在Application中设计测试代码
    * */
    private void testRemoteConfig(int code){
        switch (code){
            case 0:
                //设置远程配置请求url为""
                saConfigOptions.setRemoteConfigUrl("");
                break;
            case 1:
                //设置远程配置请求url为null
                saConfigOptions.setRemoteConfigUrl(null);
                break;
            case 2:
                //设置远程配置最小时间间隔为50,当设置为异常数据时,SDK直接触发配置请求且不会写入到本地sp中
                saConfigOptions.setMinRequestInterval(50);
                break;
            case 3:
                //设置远程配置最大时间间隔为10
                saConfigOptions.setMaxRequestInterval(10);
                break;
            case 4:
                //设置最小时间间隔为10,最大为20
                saConfigOptions.setMinRequestInterval(10);
                saConfigOptions.setMaxRequestInterval(12);
                break;
            case 5:
                //设置最小时间间隔为46,最大为48
                saConfigOptions.setMinRequestInterval(46);
                break;
            case 6:
                //设置最小时间间隔为24,最大为26
                saConfigOptions.setMaxRequestInterval(26);
                break;
            case 7:
                //设置最小时间间隔为50,最大为60
                saConfigOptions.setMinRequestInterval(50);
                saConfigOptions.setMaxRequestInterval(52);
                break;
        }

    }

    private void testCallBack(){
        SensorsDataAPI.sharedInstance().setTrackEventCallBack(new SensorsDataTrackEventCallBack() {
            @Override
            public boolean onTrackEvent(String eventName, JSONObject properties) {
                Log.e(TAG, "eventName:"+eventName+",properties:"+properties.toString() );
                if (eventName.equals("$AppInstall")){
                    try {
                        Thread.sleep(5000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                    try {
                        properties.put("ka","sss");
                    }catch (Exception e){
                        e.printStackTrace();
                    }
                return true;
            }
        });
    }

    //验证退出时长异常的缺陷
    private void testDuration(){
//        SharedPreferences sharedPreferences = SensorsDataUtils.getSharedPreferences(this);
//        int number = sharedPreferences.getInt("Key", 0);
//        Log.e("SA.Andoter","number = " + number);
//        if (number == 0) {
//            sharedPreferences.edit().putInt("Key", ++number).apply();
//        } else {
//            if (number % 2 != 0) {
//                sharedPreferences.edit().putInt("Key", ++number).apply();
//                int code = 5/0;
//            }
//        }
    }
    //多进程测试
    private void testMultiProcess(){
        int pid = android.os.Process.myPid();
        String pName=Common.getProcessName();
        Log.d(TAG, "pid:" + pid);
        if (!TextUtils.isEmpty(pName)&&pName.equals(this.getPackageName())){
            Log.d(TAG, "pName:" + pName);
        }
    }
    /**
     * 初始化设备采集 SDK，注意由于设备采集 SDK 会使用神策分析 SDK 中的 API 接口，需要先初始化神策分析 SDK。
     */
//    private void initSensorsRiskControlAPI () {
//        SARiskControlAPI.RCConfigOptions rcConfigOptions = new SARiskControlAPI.RCConfigOptions();
//        rcConfigOptions.enableTrackAppList(true, true);
//        // 开启传感器
//        rcConfigOptions.enableSensorDetector(true);
//        SARiskControlAPI.startWithConfigOptions(this, rcConfigOptions);
//    }
    //是否同意隐私协议
    private boolean isAgree(){
        SharedPreferences sp=getSharedPreferences("data", Context.MODE_PRIVATE);
        return sp.getBoolean("isAgree",false);
    }

    private void testInit(){
        //http://10.120.217.246:8106/sa?project=default
        saConfigOptions=new SAConfigOptions(SA_SERVER_URL);
        saConfigOptions.disableSDK(false);
        saConfigOptions.enableTrackPageLeave(true);
        //验证 ssl，需要将数据接收地址修改成如下的链接
//        saConfigOptions=new SAConfigOptions("https://ljy.test.ssl.cn:443/sa?project=liuweiqiang&token=5a394d2405c147ca");
        saConfigOptions.enableLog(true);
        saConfigOptions.setNetworkTypePolicy(SensorsNetworkType.TYPE_4G);
        saConfigOptions.enableJavaScriptBridge(true);
        saConfigOptions.setMaxRequestInterval(11);
        saConfigOptions.setMinRequestInterval(10);
        saConfigOptions.enableEncrypt(true);
        saConfigOptions.persistentSecretKey(new IPersistentSecretKey() {
            @Override
            public void saveSecretKey(SecreteKey secreteKey) {
                if (secreteKey!=null){
                    SharedPreferences sp=getSharedPreferences("data", Context.MODE_PRIVATE);
                    SharedPreferences.Editor editor=sp.edit();
                    editor.putString("secretKey",secreteKey.key);
                    editor.putInt("secretVersion",secreteKey.version);
                    editor.apply();
                }
            }
            @Override
            public SecreteKey loadSecretKey() {
                //这里是 SDK 读取密钥，必须实现。SDK 通过该接口读取密钥用于加密
                SharedPreferences sp=getSharedPreferences("data", Context.MODE_PRIVATE);
                String key=sp.getString("secretKey","");
                int version=sp.getInt("secretVersion",0);
                SecreteKey secreteKey=null;
                if (!key.equals("")&&version!=0){
                    secreteKey = new SecreteKey(key,version,"AES","RSA");
                }
                return secreteKey;
            }
        });
        saConfigOptions.disableRandomTimeRequestRemoteConfig();
        saConfigOptions.disableDebugAssistant();
        saConfigOptions.enableAutoAddChannelCallbackEvent(true);
        saConfigOptions.enableHeatMap(true);
        saConfigOptions.enableVisualizedAutoTrack(true);
        saConfigOptions.enableVisualizedProperties(true);
        saConfigOptions.enableSaveDeepLinkInfo(true);
        saConfigOptions.enableSubProcessFlushData();
        saConfigOptions.enableTrackAppCrash();
        saConfigOptions.enableTrackScreenOrientation(true);
        saConfigOptions.setAutoTrackEventType(SensorsAnalyticsAutoTrackEventType.APP_START|SensorsAnalyticsAutoTrackEventType.APP_CLICK|SensorsAnalyticsAutoTrackEventType.APP_VIEW_SCREEN|SensorsAnalyticsAutoTrackEventType.APP_END);
        saConfigOptions.setFlushBulkSize(50);
        saConfigOptions.setFlushInterval(5);
        saConfigOptions.setMaxCacheSize(64*1024*1024);
        saConfigOptions.setServerUrl(SA_SERVER_URL);
        saConfigOptions.setRemoteConfigUrl("http://10.120.217.246:8106/config/Android.conf");
        saConfigOptions.setSourceChannels("a","b");
        saConfigOptions.enableTrackPush(true);
        saConfigOptions.setSSLSocketFactory(Common.getSSL_DER(this));
        saConfigOptions.disableDeviceId();
        saConfigOptions.enableTrackPageLeave(true,true);
        saConfigOptions.registerStorePlugin(new SAEncryptStorePlugin(this));
        saConfigOptions.setEventSessionTimeout(100);
        saConfigOptions.setCustomAdChannelUrl("https://satdemo04-slink07.debugbox.sensorsdata.cn");
        List<Class<?>> ignoreList=new ArrayList<>();
        ignoreList.add(ViewActivity.class);
        saConfigOptions.ignorePageLeave(ignoreList);
        saConfigOptions.enableSession(true);
        saConfigOptions.registerPropertyPlugin(new PropertyPlugin());
        //曝光采集
        SAExposureConfig exposureConfig=new SAExposureConfig(1.0f,4,true);
//        exposureConfig.setDelayTime(0);
        saConfigOptions.setExposureConfig(exposureConfig);
        SensorsDataAPI.startWithConfigOptions(this,saConfigOptions);
        SensorsDataAPI.enableSDK();
//        SensorsDataAPI.sharedInstance(this,SA_SERVER_URL);
//        SensorsDataAPI.sharedInstance(this,saConfigOptions);
        SensorsDataAPI.sharedInstance().enableLog(true);
//        SensorsDataAPI.sharedInstance().enableDataCollect();

    }

}
