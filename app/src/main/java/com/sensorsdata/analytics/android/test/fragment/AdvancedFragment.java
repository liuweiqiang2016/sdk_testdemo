package com.sensorsdata.analytics.android.test.fragment;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.JsonReader;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Switch;
import android.widget.TextView;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.sdk.util.SensorsDataUtils;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Advanced;
import com.sensorsdata.analytics.android.test.utils.Common;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.InputStream;
import java.security.KeyStore;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;
import java.util.ArrayList;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManagerFactory;

public class AdvancedFragment extends Fragment implements View.OnClickListener {
    private Advanced advanced=new Advanced();

    private TextView TextView_Orientation;
    private TextView TextView_LastScreen;
    private TextView TextView_isdebug;
    private TextView TextView_getLSUproperty;
    private EditText EditText_latitude;
    private EditText EditText_longtitude;
    private TextView TextView_mainprocess;

    private String[] spinnerItems={"wyy's","liuweiqiang's","SSL","空"};
    private String[] spinnerOaidItems={"test-oaid", "中文", "", "null"};
    //属性值集合
    private String[] values={"null","空字符串","value","你好","1024个s","1025个s","99","99.123","99.45678","9E15+0.1","-95E15-0.1","{}","{\"\"}","{\"255个s\"}",
            "{\"256个s\"}","{\"501个元素\"}","{1}","true","false","2019-08-01 11:11:11.111","2019-08-02 11:11:11","2019-08-03","1900-08-04","1899-08-05","2099-08-06", "2100-08-07",
            "2019-13-08","2019-08-32","2019-xx-09","2019-08-01 25:01:01","2019-08-01 23:61:02","2019-08-01 23:23:62","2019-08-01 23:23:23.1234"};
    //类型转换的属性值集合
    private String[] t_values={"数字0","数字1","数字99","布尔true","布尔false","{\"a\"}","空字符串","b","2019-08-01","true","false","0","1","100"};
    private String string1024s,string1025s,string255s,string256s;

    private Spinner mSpinner;
    private Spinner mSpinnerOaid;

    private String wyy="https://sdktest.datasink.sensorsdata.cn/sa?project=wangyangyang&token=21f2e56df73988c7";
    private String lwq="https://sdktest.datasink.sensorsdata.cn/sa?project=liuweiqiang&token=21f2e56df73988c7";
    private String ssl="https://test2.kbyte.cn:443/sa?project=wangyangyang&token=21f2e56df73988c7";
    private TextView TextView_getCookie;
    private EditText EditText_setCookie;
    private EditText EditText_eventName;


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_advanced, container, false);
        view.findViewById(R.id.btn_getOrientation).setOnClickListener(this);
        view.findViewById(R.id.btn_getLastScreen).setOnClickListener(this);
        view.findViewById(R.id.btn_close_callback).setOnClickListener(this);
        view.findViewById(R.id.btn_open_callback).setOnClickListener(this);
        view.findViewById(R.id.btn_clearLastScreen).setOnClickListener(this);
        view.findViewById(R.id.btn_enableLog).setOnClickListener(this);
        view.findViewById(R.id.btn_disenableLog).setOnClickListener(this);
        view.findViewById(R.id.btn_appcrash).setOnClickListener(this);
        view.findViewById(R.id.btn_enableOrientation).setOnClickListener(this);
        view.findViewById(R.id.btn_disableOrientation).setOnClickListener(this);
        view.findViewById(R.id.btn_stopOrientation).setOnClickListener(this);
        view.findViewById(R.id.btn_resumeOrientation).setOnClickListener(this);
        view.findViewById(R.id.btn_isDebug).setOnClickListener(this);
        view.findViewById(R.id.btn_getLSUproperty).setOnClickListener(this);
        view.findViewById(R.id.btn_setGPS).setOnClickListener(this);
        view.findViewById(R.id.btn_clearGPS).setOnClickListener(this);
        view.findViewById(R.id.btn_mainprocess).setOnClickListener(this);
        view.findViewById(R.id.btn_setserverUrl).setOnClickListener(this);
        view.findViewById(R.id.btn_setCookie_true).setOnClickListener(this);
        view.findViewById(R.id.btn_setCookie_false).setOnClickListener(this);
        view.findViewById(R.id.btn_getCookie_ture).setOnClickListener(this);
        view.findViewById(R.id.btn_getCookie_false).setOnClickListener(this);
        view.findViewById(R.id.btn_setSSL_der).setOnClickListener(this);
        view.findViewById(R.id.btn_setSSL_bks).setOnClickListener(this);
        view.findViewById(R.id.btn_unsetSSL).setOnClickListener(this);
        view.findViewById(R.id.btn_trackinstall).setOnClickListener(this);
        view.findViewById(R.id.btn_trackinstall_properties).setOnClickListener(this);
        view.findViewById(R.id.btn_trackinstall_oaid).setOnClickListener(this);
        view.findViewById(R.id.btn_tracksignUp).setOnClickListener(this);
        view.findViewById(R.id.btn_tracksignUp_properties).setOnClickListener(this);
        view.findViewById(R.id.btn_trackinstall_callback_true).setOnClickListener(this);
        view.findViewById(R.id.btn_trackinstall_callback_false).setOnClickListener(this);
        view.findViewById(R.id.btn_trackchannel_event).setOnClickListener(this);
        view.findViewById(R.id.btn_trackchannel_event_oaid).setOnClickListener(this);

        //crash按钮
        view.findViewById(R.id.btn_crash1).setOnClickListener(this);
        view.findViewById(R.id.btn_crash2).setOnClickListener(this);
        view.findViewById(R.id.btn_crash3).setOnClickListener(this);

        TextView_Orientation=view.findViewById(R.id.tv_Orientation);
        TextView_LastScreen=view.findViewById(R.id.tv_getLastScreen);
        TextView_isdebug=view.findViewById(R.id.tv_isDebug);
        TextView_getLSUproperty=view.findViewById(R.id.tv_getLSUproperty);
        TextView_mainprocess=view.findViewById(R.id.tv_mainprocess);
        TextView_getCookie=view.findViewById(R.id.tv_getCookie);

        EditText_latitude=view.findViewById(R.id.et_setlatitude);
        EditText_longtitude=view.findViewById(R.id.et_setlongitude);
        EditText_setCookie=view.findViewById(R.id.et_setCookie);
        EditText_eventName=view.findViewById(R.id.et_eventName);
        initSpinner(view);

        Switch sw_permission = view.findViewById(R.id.sw_permission);
        SharedPreferences sp=getActivity().getSharedPreferences("data", Context.MODE_PRIVATE);
        boolean isAgree=sp.getBoolean("isAgree",false);
        //根据标志位，更新开关状态
        sw_permission.setChecked(isAgree);
        sw_permission.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                SharedPreferences.Editor editor=sp.edit();
                if (b){
                    editor.putBoolean("isAgree",true);
                    editor.apply();
                    SensorsDataAPI.enableSDK();
//                    SensorsDataAPI.sharedInstance().enableDataCollect();
                }else {
                    editor.putBoolean("isAgree",false);
                    editor.apply();
                    SensorsDataAPI.disableSDK();
                }
            }
        });

        return view;
    }

    //初始化spinner
    private void initSpinner(View view){
        mSpinner=(Spinner) view.findViewById(R.id.spinner_serverurl);
        ArrayAdapter spinnerAdapter=new ArrayAdapter<>(this.getContext(), R.layout.item_select_auto,spinnerItems);
        spinnerAdapter.setDropDownViewResource(R.layout.item_select_auto);
        mSpinner.setAdapter(spinnerAdapter);
        //点击响应事件
//        mSpinner.setOnItemSelectedListener(this);
        mSpinnerOaid = view.findViewById(R.id.spinner_oaid);
        ArrayAdapter spinnerAdapterOaid = new ArrayAdapter<>(this.getContext(), R.layout.item_select_auto,values);
//        spinnerAdapterOaid.setDropDownViewResource(R.layout.item_select_auto);
        mSpinnerOaid.setAdapter(spinnerAdapterOaid);
        string1024s= Common.getBigString(1024);
        string1025s=Common.getBigString(1025);
        string255s=Common.getBigString(255);
        string256s=Common.getBigString(256);

    }
    private JSONObject getOaidItem() throws JSONException {
        JSONObject properties = new JSONObject();
        JSONArray array=null;
        int pos = mSpinnerOaid.getSelectedItemPosition();
        switch (pos){
            case 0:
                //属性值为null
                properties.put("$oaid",null);
                break;
            case 1:
                //属性值为""
                properties.put("$oaid","");
                break;
            case 4:
                //属性值为1024个s
                properties.put("$oaid",string1024s);
                break;
            case 5:
                //属性值为1025个s
                properties.put("$oaid",string1025s);
                break;
            case 6:
                //属性值为99
                properties.put("$oaid",99);
                break;
            case 7:
                //属性值为99.123
                properties.put("$oaid",99.123);
                break;
            case 8:
                //属性值为99.45678
                properties.put("$oaid",99.45678);
                break;
            case 9:
                //属性值为9E15+0.1
                properties.put("$oaid",9E15+0.1);
                break;
            case 10:
                //属性值为-9E15-0.1
                properties.put("$oaid",-9E15-0.1);
                break;
            case 11:
                //属性值为{}
                array=new JSONArray();
                properties.put("$oaid",array);
                break;
            case 12:
                //属性值为{""}
                array=new JSONArray();
                array.put("");
                properties.put("$oaid",array);
                break;
            case 13:
                //属性值为{"255个s"}
                array=new JSONArray();
                array.put(string255s);
                properties.put("$oaid",array);
                break;
            case 14:
                //属性值为{"256个s"}
                array=new JSONArray();
                array.put(string256s);
                properties.put("$oaid",array);
                break;
            case 15:
                //属性值为501个元素
                array=new JSONArray();
                for (int i=0;i<501;i++){
                    array.put(i+"");
                }
                properties.put("$oaid",array);
                break;
            case 16:
                //属性值为{1}
                array=new JSONArray();
                array.put(1);
                properties.put("$oaid",array);
                break;
            case 17:
                //属性值为true
                properties.put("$oaid",true);
                break;
            case 18:
                //属性值为false
                properties.put("$oaid",false);
                break;
            default:
                //属性值为字符串类型或datetime类型，属性值直接从数组中找
                properties.put("$oaid",values[pos]);
                break;
        }
        return properties;
    }

    @Override
    public void onClick(View v) {
        String eventName=EditText_eventName.getText().toString();

        switch (v.getId()){
            case R.id.btn_enableLog:
                advanced.enableLog(true);
                break;

            case R.id.btn_disenableLog:
                advanced.enableLog(false);
                break;

            case R.id.btn_appcrash:
                advanced.enableTrackAppCrash();
                break;

            case R.id.btn_enableOrientation:
                advanced.enableTrackScreenOrientation(true);
                break;

            case R.id.btn_disableOrientation:
                advanced.enableTrackScreenOrientation(false);
                break;

            case R.id.btn_stopOrientation:
                advanced.stopTrackScreenOrientation();
                break;

            case R.id.btn_resumeOrientation:
                advanced.resumeTrackScreenOrientation();
                break;

            case R.id.btn_getOrientation:
                TextView_Orientation.setText(advanced.getScreenOrientation());
                break;

            case R.id.btn_isDebug:
                TextView_isdebug.setText(Boolean.toString(advanced.isDebug()));
                break;

            case R.id.btn_getLastScreen:
                String getlastscreen=advanced.getLastScreenUrl();
                TextView_LastScreen.setText(getlastscreen);
                break;

            case R.id.btn_clearLastScreen:
                advanced.clearLastScreen();
                break;

            case R.id.btn_getLSUproperty:
                TextView_getLSUproperty.setText(advanced.getLastScreenTrackProperties().toString());
                break;

            case R.id.btn_setGPS:
                if ("".equals(String.valueOf(EditText_latitude.getText()))){

                    advanced.setGPSLocation((Double)null,(Double)null);
                }else {
                    Double latitude=Double.parseDouble(String.valueOf(EditText_latitude.getText()));
                    Double longtitude=Double.parseDouble(String.valueOf(EditText_longtitude.getText()));
                    advanced.setGPSLocation(latitude,longtitude);
                }

                break;

            case R.id.btn_clearGPS:
                advanced.clearGPS();
                break;

            case R.id.btn_close_callback:
                advanced.setTrackEventCallBack(null);
                break;

            case R.id.btn_open_callback:
                //开启事件callback
                advanced.setTrackEventCallBack(advanced);
                break;

            case R.id.btn_mainprocess:
                TextView_mainprocess.setText(advanced.getMainProcessName());
                break;

            case R.id.btn_setserverUrl:
                int pos=mSpinner.getSelectedItemPosition();
                if ("wyy's".equals(spinnerItems[pos])){
                    advanced.setServerUrl(wyy);
                }else if ("liuweiqiang's".equals(spinnerItems[pos])){
                    advanced.setServerUrl(lwq);
                }else if ("SSL".equals(spinnerItems[pos])){
                    advanced.setServerUrl(ssl);
                }else if ("空".equals(spinnerItems[pos])){
                    advanced.setServerUrl("");
                }
                break;

            case R.id.btn_getCookie_ture:
                TextView_getCookie.setText(advanced.getCookie(true));
                break;

            case R.id.btn_getCookie_false:
                //TextView_getCookie.setText(advanced.getCookie(false));
//                Log.e("SA.S", "androidID:"+ SensorsDataUtils.getIdentifier(getContext()));
                Log.e("SA.S", "getAnonymousId:"+ SensorsDataAPI.sharedInstance().getAnonymousId());
                Log.e("SA.S", "getDistinctId:"+ SensorsDataAPI.sharedInstance().getDistinctId());
                break;

            case R.id.btn_setCookie_true:
                String cookie=EditText_setCookie.getText().toString();
                advanced.setCookie(cookie,true);
                break;

            case R.id.btn_setCookie_false:
                String cookie2=EditText_setCookie.getText().toString();
                advanced.setCookie(cookie2,false);
                break;

            case R.id.btn_setSSL_der:
                advanced.setSSLSocketFactory(der());
                break;

            case R.id.btn_setSSL_bks:
                advanced.setSSLSocketFactory(bks(this.getContext()));
                break;


            case R.id.btn_unsetSSL:
                advanced.setSSLSocketFactory(null);
                break;

            case R.id.btn_trackinstall:
                //advanced.trackinstallation(eventName);
                SensorsDataAPI.sharedInstance().trackAppInstall();
                break;

            case R.id.btn_trackinstall_properties:
//                try {
//                    advanced.trackinstallation(eventName,json());
//                } catch (JSONException e) {
//                    e.printStackTrace();
//                }

                JSONObject properties=new JSONObject();
                try {
                    properties.put("aa",123);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                SensorsDataAPI.sharedInstance().trackAppInstall(properties,true);
                break;

            case R.id.btn_tracksignUp:
                advanced.trackSignUp(eventName);
                break;

            case R.id.btn_tracksignUp_properties:
                try {
                    advanced.trackSignUp(eventName,json());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;

            case R.id.btn_crash1:
                String name=null;
                name.toString();
                break;

            case R.id.btn_crash2:
                String[] testlist=new String[2];
                testlist[4]="测试";
                break;

            case R.id.btn_crash3:
                ArrayList<String> mArrayList = null;
                mArrayList.size();
                break;

            case R.id.btn_trackinstall_callback_true:
                try {
                    advanced.trackinstallation(eventName,json(),true);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;

            case R.id.btn_trackinstall_callback_false:
                try {
                    advanced.trackinstallation(eventName,json(),false);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;

            case R.id.btn_trackchannel_event:
                try {
                    JSONObject jsonObject=new JSONObject();
                    jsonObject.put("channelEvent","channel");
                    advanced.trackChannelEvent(eventName,jsonObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;

            case R.id.btn_trackinstall_gaid:
                try {
                    JSONObject jsonObject=new JSONObject();
                    jsonObject.put("$gaid","e4fe9bde-caa0-47b6-908d-ffba3fa184f2");
                    SensorsDataAPI.sharedInstance().trackInstallation(eventName, jsonObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;

            case R.id.btn_trackinstall_oaid:

                try {
                    JSONObject jsonObject = getOaidItem();
                    SensorsDataAPI.sharedInstance().trackInstallation(eventName, jsonObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;

            case R.id.btn_trackchannel_event_oaid:
//                oaid = mSpinnerOaid.getSelectedItem().toString();
//                switch (oaid){
//                    case "null":
//                        oaid = null;
//                        break;
//                }
                try {
//                    JSONObject jsonObject=new JSONObject();
//                    jsonObject.put("$oaid", oaid);
//                    Logger.d("trackChannelEvent oaid: " + oaid);
                    JSONObject jsonObject = getOaidItem();
                    SensorsDataAPI.sharedInstance().trackChannelEvent(eventName, jsonObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;

            default:
                break;

        }

    }

    public JSONObject json() throws JSONException {
        JSONObject newjson = new JSONObject();
        newjson.put("yywang1",12);
        newjson.put("yywang2","hehe");
        newjson.put("yywang3",true);
        newjson.put("yywang4",12.2344);

        return newjson;

    }

    //设置SSL_der证书
    public SSLSocketFactory der(){

        try {
            //构建 SSLSocketFactory 实例
            SSLSocketFactory sslSocketFactory ;
            CertificateFactory cf = CertificateFactory.getInstance("X.509");
            // 其中 R.raw.ca 是您这边自签证书的公钥
            InputStream in = getResources().openRawResource(R.raw.ca);
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


    //设置bks证书
    public SSLSocketFactory bks(Context context){
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

}
