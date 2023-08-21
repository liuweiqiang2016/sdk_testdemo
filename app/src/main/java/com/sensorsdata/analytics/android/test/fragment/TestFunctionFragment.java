package com.sensorsdata.analytics.android.test.fragment;


import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.ArrayMap;
import android.util.ArraySet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.widget.Button;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.sdk.SensorsDataDynamicSuperProperties;
import com.sensorsdata.analytics.android.sdk.SensorsDataTrackEventCallBack;
import com.sensorsdata.analytics.android.sdk.SensorsNetworkType;
import com.sensorsdata.analytics.android.sdk.deeplink.SensorsDataDeepLinkCallback;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.activity.HomeActivity;
import com.sensorsdata.analytics.android.test.view.X5WebView;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/*
* 测试所有的 SDK 接口
* */
public class TestFunctionFragment extends Fragment implements View.OnClickListener{

    private Button btn_fun;
    private SensorsDataAPI api;
    private WebView webView;
    private X5WebView x5WebView;
    AlertDialog dialog;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_function, container, false);
        btn_fun=view.findViewById(R.id.btn_fun);
        webView=view.findViewById(R.id.wv_fun);
        x5WebView=view.findViewById(R.id.x5_fun);
        btn_fun.setOnClickListener(this);
        api=SensorsDataAPI.sharedInstance();
        initSingleDialog();
        return view;
    }

    public void initSingleDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
        builder.setTitle("你现在的居住地是：");
        String[] cities = {"北京", "上海", "广州", "深圳", "杭州", "天津", "成都","北京"};

        builder.setSingleChoiceItems(cities, 0, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
            }
        });
        //设置正面按钮
        builder.setPositiveButton("确认", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });
        //设置反面按钮
        builder.setNegativeButton("取消", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });
        dialog = builder.create();
        //dialog.show();
    }


    @Override
    public void onClick(View view) {
        if (view.getId()==R.id.btn_fun){
            System.out.println("开始执行.......");
            //不进行数据上报
           // api.setFlushNetworkPolicy(SensorsDataAPI.NetworkType.TYPE_NONE);
            api.addVisualizedAutoTrackActivity(HomeActivity.class);
            List<Class<?>> list=new ArrayList<>();
            api.addHeatMapActivities(list);
            List<Class<?>> activitiesList=new ArrayList<>();
            api.addHeatMapActivity(HomeActivity.class);
            api.addVisualizedAutoTrackActivities(activitiesList);
            api.clearGPSLocation();
            api.clearLastScreenUrl();
            api.clearReferrerWhenAppEnd();
            api.clearSuperProperties();
            api.clearTrackTimer();
            api.deleteAll();
//            List<AutoTrackEventType> eventTypeList = new ArrayList<>();
//            api.disableAutoTrack(AutoTrackEventType.APP_CLICK);
//            api.disableAutoTrack(eventTypeList);
//            //api.enableDataCollect();
////            api.enableAppHeatMapConfirmDialog(true);
//            api.enableAutoTrack(eventTypeList);
//            api.enableAutoTrack();
            api.enableAutoTrackFragment(TestFunctionFragment.class);
            api.enableAutoTrackFragments(activitiesList);
//            api.enableHeatMap();
            api.enableNetworkRequest(true);
//            api.enableReactNativeAutoTrack();
            api.enableTrackScreenOrientation(true);
//            api.enableVisualizedAutoTrackConfirmDialog(true);
//            api.enableVisualizedAutoTrack();
            api.flush();
            api.flushSync();
            api.getAnonymousId();
            api.getCookie(false);
            api.getDistinctId();
            api.getFlushBulkSize();
            api.getFlushInterval();
            api.getIgnoredViewTypeList();
            api.getLastScreenTrackProperties();
            api.getLastScreenUrl();
            api.getLoginId();
            api.getMaxCacheSize();
            api.getPresetProperties();
            api.getScreenOrientation();
            api.getSessionIntervalTime();
            api.getSuperProperties();
            //v5.1.4 去除
//            api.getMainProcessName();
            api.getClass();
            api.identify("abc");
            api.ignoreAutoTrackActivities(activitiesList);
            api.ignoreAutoTrackActivity(HomeActivity.class);
            api.ignoreAutoTrackFragment(TestFunctionFragment.class);
            api.ignoreAutoTrackFragments(activitiesList);
            api.ignoreView(btn_fun);
            api.ignoreView(btn_fun,false);
            api.ignoreViewType(Button.class);
//            api.ignoreAutoTrackEventType(SensorsDataAPI.AutoTrackEventType.APP_CLICK);
//            api.ignoreAutoTrackEventType(eventTypeList);
            api.isActivityAutoTrackAppClickIgnored(HomeActivity.class);
            api.isActivityAutoTrackAppViewScreenIgnored(HomeActivity.class);
            api.isAutoTrackEnabled();
//            api.isAutoTrackEventTypeIgnored(AutoTrackEventType.APP_CLICK);
            api.isDebugMode();
            api.isFragmentAutoTrackAppViewScreen(TestFunctionFragment.class);
            api.isHeatMapActivity(HomeActivity.class);
            api.isHeatMapEnabled();
            api.isNetworkRequestEnable();
//            api.isReactNativeAutoTrackEnabled();
            api.isTrackFragmentAppViewScreenEnabled();
            api.isVisualizedAutoTrackActivity(HomeActivity.class);
            api.isVisualizedAutoTrackEnabled();
            api.itemDelete("a","a");
            api.itemSet("a","b",new JSONObject());
            api.login("abc");
            api.login("abc",new JSONObject());
            api.logout();
            api.profileAppend("a","b");
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
                Set<String> set=new ArraySet<String>();
                set.add("bbb");
                api.profileAppend("a",set);
            }
            api.profileDelete();
            api.profileIncrement("a",123);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                api.profileIncrement(new ArrayMap<String,Number>());
            }
            api.profilePushId("a","a");
            api.profileSet(new JSONObject());
            api.profileSet("age",23);
            api.profileSetOnce(new JSONObject());
            api.profileSetOnce("bax",44);
            api.profileUnset("aa");
            api.profileUnsetPushId("aaa");
            api.registerDynamicSuperProperties(new SensorsDataDynamicSuperProperties() {
                @Override
                public JSONObject getDynamicSuperProperties() {
                    return null;
                }
            });
            api.registerSuperProperties(new JSONObject());
            api.removeTimer("aaa");
            api.resetAnonymousId();
            api.resumeAutoTrackActivities(activitiesList);
            api.resumeAutoTrackActivity(HomeActivity.class);
            api.resumeIgnoredAutoTrackFragment(TestFunctionFragment.class);
            api.resumeIgnoredAutoTrackFragments(activitiesList);
            api.resumeTrackScreenOrientation();
            api.setFlushNetworkPolicy(SensorsNetworkType.TYPE_NONE);
            api.setSessionIntervalTime(12*10000);
            api.setCookie("aa",true);
            api.setServerUrl("http://newsdktest.datasink.sensorsdata.cn/sa?project=liuweiqiang&token=5a394d2405c147ca");
            api.setDeepLinkCallback(new SensorsDataDeepLinkCallback() {
                @Override
                public void onReceive(String params, boolean success, long appAwakePassedTime) {

                }
            });
            api.setGPSLocation(12.0,22.0);
            api.setFlushBulkSize(20);
            api.setFlushInterval(30);
            api.setMaxCacheSize(64*1024);
            api.setTrackEventCallBack(new SensorsDataTrackEventCallBack() {
                @Override
                public boolean onTrackEvent(String eventName, JSONObject eventProperties) {
                    return true;
                }
            });
            api.setViewActivity(btn_fun, getActivity());
            api.setViewFragmentName(btn_fun,TestFunctionFragment.class.getName());
            api.setViewID(btn_fun,"aaa");
            api.setViewID(dialog,"aaa");
            api.setViewID(new Object(),"aaa");
            api.setViewProperties(btn_fun,new JSONObject());
            api.showUpWebView(webView,true);
            api.showUpWebView(webView,true,true);
            api.showUpWebView(webView,true,new JSONObject());
            api.showUpWebView(webView,new JSONObject(),true,true);
            api.showUpX5WebView(x5WebView);
            api.showUpX5WebView(x5WebView,true);
            api.showUpX5WebView(x5WebView,new JSONObject(),true,true);
            api.stopTrackThread();
            api.startTrackThread();
            api.stopTrackScreenOrientation();
            api.trackInstallation("app",new JSONObject());
            api.trackInstallation("bb");
            api.trackInstallation("app",new JSONObject(),true);
            api.track("aa");
            api.track("aa",new JSONObject());
            api.trackChannelEvent("abc",new JSONObject());
//            api.trackTimer("abc");
//            api.trackTimer("abc", TimeUnit.MILLISECONDS);
//            api.trackTimerBegin("aaa");
            api.trackTimerEnd("aaa");
            api.trackTimerEnd("abc",new JSONObject());
            api.trackTimerResume("aaa");
            api.trackTimerStart("abc");
//            api.trackSignUp("abc");
            api.trackViewAppClick(btn_fun,new JSONObject());
            api.trackViewScreen(TestFunctionFragment.class);
            api.trackViewScreen(HomeActivity.class);
            api.trackViewScreen("url",new JSONObject());
            api.trackTimerPause("aa");
            api.trackAppInstall();
//            api.trackAppCrash();

            JSONObject jsonObject=new JSONObject();
            api.trackFragmentAppViewScreen();
            api.unregisterSuperProperty("abc");
            api.enableDeepLinkInstallSource(true);
            api.trackDeepLinkLaunch("test");
            api.enableLog(true);
            System.out.println("执行完成.....");
        }

    }

}
