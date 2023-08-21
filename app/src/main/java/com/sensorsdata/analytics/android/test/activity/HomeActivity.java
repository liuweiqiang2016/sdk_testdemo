package com.sensorsdata.analytics.android.test.activity;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.sensorsdata.abtest.SensorsABTest;
import com.sensorsdata.abtest.SensorsABTestConfigOptions;
import com.sensorsdata.analytics.android.sdk.SALog;
import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.sdk.util.SADisplayUtil;
import com.sensorsdata.analytics.android.sdk.util.SensorsDataUtils;
import com.sensorsdata.analytics.android.sdk.util.TimeUtils;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.SensorsDataSDK;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import pub.devrel.easypermissions.EasyPermissions;
//@SensorsDataIgnoreTrackAppClick
//@SensorsDataIgnoreTrackAppViewScreen
public class HomeActivity extends AppCompatActivity implements AdapterView.OnItemClickListener {

    private ListView listView;
    //需要申请的敏感权限
    private String[] permissions={
            Manifest.permission.WRITE_EXTERNAL_STORAGE,
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.READ_PHONE_STATE
    };
    private String[] strArr;
    final String ACTION_FINISH="finish",ACTION_GOHOME="goHome",ACTION_GOVIEW="goView";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        applyPermission();
        //隐私协议
        initPrivacyDialog();
        setContentView(R.layout.activity_home);
        setTitle("Home 页面");
        listView=findViewById(R.id.home_lv);
        strArr=new String[]{"事件相关","全埋点","可视化全埋点和点击图","用户相关及数据上报","注解与高级功能","H5 打通","自动化及全接口测试","小工具","基础控件验证","弹窗/AB/推送点击","全 View"};
        ArrayAdapter<String> adapter=new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,strArr);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(this);
        Common.loge("本页面使用了以下注解:@SensorsDataIgnoreTrackAppClick,@SensorsDataIgnoreTrackAppViewScreen");
//        mHandler.sendEmptyMessageDelayed(1,3000);
//        testThreadUnSafe();
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
        Intent intent=null;
        switch (strArr[i]){
            case "基础控件验证":
                //跳转到各类控件验证
                intent=new Intent(HomeActivity.this, ViewClickActivity.class);
                break;
            case "H5 打通":
                intent=new Intent(HomeActivity.this, H5Activity.class);
//                intent=new Intent(HomeActivity.this, TVActivity.class);
                break;
            case "全 View":
                intent=new Intent(HomeActivity.this, ElementActivity.class);
                break;
            default:
                //根据不同的pos，展示不同的布局文件
                intent =new Intent(HomeActivity.this, ViewActivity.class);
                intent.putExtra(Common.INTENT_TYPE,strArr[i]);
                break;
        }
        startActivity(intent);
        //验证App进入后台判断不准确缺陷，App进入后台，弹窗依然弹出
        //testHomeAction(ACTION_FINISH);
    }

    //敏感权限申请
    private void applyPermission(){
        if (Build.VERSION.SDK_INT>=Build.VERSION_CODES.M){
            if(!EasyPermissions.hasPermissions(this,permissions)){
                EasyPermissions.requestPermissions(this,"拒绝相关权限，app无法正常使用",0,permissions);
            }
        }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        onDestory();
        finish();
        android.os.Process.killProcess(android.os.Process.myPid());
        System.exit(0);

    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.e("onPause", "################");
    }

    @Override
    protected void onStart() {
        super.onStart();
    }

    @Override
    protected void onResume() {
        super.onResume();
//        try {
//            Thread.sleep(100);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//        finish();
        Log.e("onResume", "################");
    }

    public void onDestory(){
        //退出时清sp
//        for (String item:new String[]{"enableList","disableList","ignoreList"}){
//            SharedPreferences sp=getSharedPreferences(item,0);
//            SharedPreferences.Editor editor = sp.edit();
//            editor.clear();
//            editor.apply();
//
//        }
        //远程配置请求的测试项，不测试该项时可以注释此方法
//        clearRemoteConfig();
        //清空激活信息，不测试该项时可以注释此方法
//        clearTrackInstallConfig();

    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    //每次app退出时，都清远程配置的时间间隔，保证每次进入app都会触发请求
    private void clearRemoteConfig(){
        SharedPreferences sp=getSharedPreferences("sensorsdata",0);
        SharedPreferences.Editor editor = sp.edit();
        editor.remove("sensorsdata.request.time");
        editor.remove("sensorsdata.request.time.random");
        editor.apply();
    }
    //每次退出app,清空激活信息，保障下次app可以使用激活接口而不用手动清除数据
    private void clearTrackInstallConfig(){
        SharedPreferences sp=getSharedPreferences("com.sensorsdata.analytics.android.sdk.SensorsDataAPI",0);
        SharedPreferences.Editor editor = sp.edit();
        editor.remove("first_track_installation");
        editor.remove("first_track_installation_with_callback");
        editor.apply();
    }

    /*
    * 解决浏览器重复扫描二维码，第二次无法正常弹出弹窗缺陷
    * */

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        SensorsDataUtils.handleSchemeUrl(this,intent);
    }

    private void initPrivacyDialog() {
        SharedPreferences sp=getSharedPreferences("data", Context.MODE_PRIVATE);
        boolean isAgree=sp.getBoolean("isAgree",false);
        //如果已同意，弹窗不弹
        if (isAgree){
            //申请权限
            //applyPermission();
            return;
        }
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("隐私协议更新");
        builder.setIcon(R.mipmap.ic_launcher_round);
        View view= LayoutInflater.from(this).inflate(R.layout.view_privacy,null,false);
        TextView textView=view.findViewById(R.id.privacy_content);
        textView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

            }
        });
        if (Build.VERSION.SDK_INT>=Build.VERSION_CODES.LOLLIPOP){
            builder.setView(view);
        }else {
            builder.setMessage("隐私协议更新，需要同意相关协议方可使用本 App，请问您是否同意?");
        }
        //点击对话框以外的区域是否让对话框消失
        builder.setCancelable(false);
        //设置正面按钮
        builder.setPositiveButton("同意", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                SharedPreferences.Editor editor=sp.edit();
                editor.putBoolean("isAgree",true);
                editor.apply();
                //关闭弹窗
                dialog.dismiss();
                //申请权限
//                applyPermission();
                //动态开启 SDK
//                SensorsDataAPI.enableSDK();
                //开启SDK数据采集
//                SensorsDataAPI.sharedInstance().enableDataCollect();
                //SDK 延迟初始化
                SensorsDataSDK.initSA(HomeActivity.this);
            }
        });
        //设置反面按钮
        builder.setNegativeButton("拒绝", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                //关闭弹窗
                dialog.dismiss();
                //申请权限
                applyPermission();
            }
        });
        AlertDialog dialog = builder.create();
        //显示对话框
        dialog.show();
    }

    private void testHomeAction(String action){
        Intent intent;
        switch (action){
            case ACTION_FINISH:
                //弹窗 sdk 判断不准确测试用例
                SensorsDataAPI.sharedInstance().track("sf_music");
                finish();
                break;
            case ACTION_GOHOME:
                intent = new Intent();
                // 为Intent设置Action、Category属性
                intent.setAction(Intent.ACTION_MAIN);// "android.intent.action.MAIN"
                intent.addCategory(Intent.CATEGORY_HOME); //"android.intent.category.HOME"
                startActivity(intent);
                break;
            case ACTION_GOVIEW:
                intent=new Intent(HomeActivity.this, ViewClickActivity.class);
                startActivity(intent);
                break;
            default:
                Common.loge("非法action");
                break;
        }
    }

    @SuppressLint("HandlerLeak")
    private final Handler mHandler=new Handler(){
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            if (msg.what==1){
//                testHomeAction(ACTION_GOVIEW);
//                SensorsDataAPI.sharedInstance().deleteAll();
//                SensorsDataAPI.sharedInstance().track("test");
//                SensorsDataAPI.sharedInstance().flushSync();
//                SensorsDataAPI.sharedInstance().profileSet("age",10);
//                SensorsDataAPI.sharedInstance().itemDelete("type","123456");
//                SensorsDataAPI.sharedInstance().trackAppInstall();
//                Common.cleanDatabases(HomeActivity.this);
//                sendEmptyMessageDelayed(1,5000);
            }
        }
    };

}
