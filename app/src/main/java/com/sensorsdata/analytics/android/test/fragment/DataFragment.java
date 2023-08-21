package com.sensorsdata.analytics.android.test.fragment;


import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Switch;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.FileController;
import com.sensorsdata.analytics.android.test.utils.MyDatabaseHelper;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/*
* 数据上报模块的测试代码
* */

public class DataFragment extends Fragment implements Switch.OnCheckedChangeListener,View.OnClickListener, AdapterView.OnItemSelectedListener, AdapterView.OnItemClickListener {

    private Switch sw;
    private Spinner data_sp2;
    private Button btn_set2,btn_isnet,btn_track,pw_cancel,pw_sure;
    private View view;
    private EditText et;
    //用例集合
    private String[] cases={"时间间隔(秒)","最大缓存条数","数据库最大缓存(MB)","延时发送(秒)"};
    //无参数的用例
    private String[] strings={"强制发送数据(flush)","强制发送数据(flushSync)","获取数据上报时间间隔","获取最大缓存条数","获取数据库最大缓存","删除本地所有缓存事件","发送大批量数据(验证数据库最大缓存)","获取当前数据库条数","获取数据库中第一条数据内容","暂停数据入库线程","开启数据入库线程"};
    private ArrayAdapter<String> adapter2,adapter3;
    private ListView listView;
    private JSONObject bigObject;
    private MyDatabaseHelper dbHelper;


    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_data,container, false);
        initView();
        initEvent();
        initData();
        return view;
    }

    private void initView(){
        sw=view.findViewById(R.id.data_sw);
        data_sp2=view.findViewById(R.id.data_sp2);
        btn_set2=view.findViewById(R.id.btn_set2);
        btn_isnet=view.findViewById(R.id.btn_isnet);
        btn_track=view.findViewById(R.id.btn_track);
        et=view.findViewById(R.id.data_et);
        listView=view.findViewById(R.id.data_lv);
    }

    private void initEvent(){
        sw.setOnCheckedChangeListener(this);
        data_sp2.setOnItemSelectedListener(this);
        btn_set2.setOnClickListener(this);
        btn_track.setOnClickListener(this);
        btn_isnet.setOnClickListener(this);
        listView.setOnItemClickListener(this);
    }

    private void initData(){
        adapter2 =new ArrayAdapter<>(this.getActivity(),android.R.layout.simple_spinner_item,cases);
        data_sp2.setAdapter(adapter2);
        adapter3=new ArrayAdapter<>(this.getActivity(),android.R.layout.simple_list_item_1,strings);
        listView.setAdapter(adapter3);
        //设置按钮显示
        sw.setChecked(SensorsDataAPI.sharedInstance().isNetworkRequestEnable());
        //初始化数据库操作对象
        dbHelper=new MyDatabaseHelper(getContext());
    }

    @Override
    public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
        //根据开关设置
        SensorsDataAPI.sharedInstance().enableNetworkRequest(b);
//        FileController.getFileControl().writeToLogFile("enableNetworkRequest(bool)",b+"",null);
    }

    @Override
    public void onClick(View view) {

        if (view.getId()==R.id.btn_isnet){
            //判断当前网络是否开启
            boolean bool=SensorsDataAPI.sharedInstance().isNetworkRequestEnable();
            Common.toast(getContext(),"网络状态："+bool);
//            FileController.getFileControl().writeToLogFile("isNetworkRequestEnable()",null,bool+"");
        }
        if (view.getId()==R.id.btn_set2){
            int pos=data_sp2.getSelectedItemPosition();
            //获取EditText设置的数值
            int value=Integer.parseInt(et.getText().toString().trim());
            switch (pos){
                case 0:
                    //时间间隔(秒)
                    SensorsDataAPI.sharedInstance().setFlushInterval(value*1000);
//                    FileController.getFileControl().writeToLogFile("setFlushInterval(value*1000)",value+"",null);
                    break;
                case 1:
                    //最大缓存条数
                    SensorsDataAPI.sharedInstance().setFlushBulkSize(value);
//                    FileController.getFileControl().writeToLogFile("setFlushBulkSize(value)",value+"",null);
                    break;
                case 2:
                    //数据库最大缓存(MB)
                    SensorsDataAPI.sharedInstance().setMaxCacheSize(value*1024*1024);
//                    FileController.getFileControl().writeToLogFile("setMaxCacheSize(value*1024*1024)",value+"",null);
                    break;
                case 3:
                    //延时发送(秒)
//                    SensorsDataAPI.sharedInstance().flush(value*1000);
//                    FileController.getFileControl().writeToLogFile("flush(value*1000)",value+"",null);
                    break;
            }
        }
        if (view.getId()==R.id.btn_track){
            //根据EditText的内容发送数据
            String value=et.getText().toString().trim();
            int count;
            if (value.equals("")){
                count=1;
            }else {
                count=Integer.parseInt(value);
            }
            trackEvent(count);
        }
    }

    @Override
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {

    }

    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {

    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int i, long l) {
            switch (i){
                case 0:
                    //强制发送数据flush
                    SensorsDataAPI.sharedInstance().track("flush");
                    SensorsDataAPI.sharedInstance().flush();
//                    FileController.getFileControl().writeToLogFile("flush()",null,null);
                    break;
                case 1:
                    //强制发送数据flushSync
                    SensorsDataAPI.sharedInstance().track("flushSync");
//                    SensorsDataAPI.sharedInstance().flushSync();
//                    FileController.getFileControl().writeToLogFile("flushSync()",null,null);
                    break;
                case 2:
                    //获取时间间隔
                    int time=SensorsDataAPI.sharedInstance().getFlushInterval();
//                    FileController.getFileControl().writeToLogFile("getFlushInterval()",null,time/1000+"秒");
                    Common.toast(getContext(),time/1000+"秒");
                    break;
                case 3:
                    //获取最大条数
                    int size=SensorsDataAPI.sharedInstance().getFlushBulkSize();
//                    FileController.getFileControl().writeToLogFile("getFlushBulkSize()",null,size+"");
                    Common.toast(getContext(),size+"条");
                    break;
                case 4:
                    //获取数据库最大缓存
                    long max=SensorsDataAPI.sharedInstance().getMaxCacheSize();
//                    FileController.getFileControl().writeToLogFile("getMaxCacheSize()",null,max/1024/1024+"MB");
                    Common.toast(getContext(),max/1024/1024+"MB");
                    break;
                case 5:
                    //删除数据库所有缓存
                    SensorsDataAPI.sharedInstance().deleteAll();
//                    FileController.getFileControl().writeToLogFile("deleteAll()",null,null);
                    break;

                case 6:
                    //发送大批量数据(验证数据库最大缓存)
                    if (bigObject==null){
                        try {
                            bigObject=new JSONObject();
                            String str=Common.getBigString(1024);
                            for (int b=0;b<128;b++){
                                bigObject.put("bigString"+b,str);
                            }
                        }catch (Exception e){
                            e.printStackTrace();
                        }
                    }
                    String value=et.getText().toString().trim();
                    trackBigEvent(value);
                    break;
                case 7:
                    //获取当前数据库条数
                    Common.toast(getContext(),dbHelper.getDataSize()+"");
                    break;
                case 8:
                    //获取数据库中第一条数据内容
                    try {
                        JSONArray array=dbHelper.getAllEvents();
                        if (array!=null){
                            Log.e("data", array.get(0).toString());
                        }
                    }catch (JSONException e){
                    }
                    break;
                case 9:
                    //暂停数据入库线程
                    SensorsDataAPI.sharedInstance().stopTrackThread();
                    break;
                case 10:
                    //开启数据入库线程
                    SensorsDataAPI.sharedInstance().startTrackThread();
                    break;
            }
    }

    //根据count触发事件
    private void trackEvent(int count){
        String eventName="data";
        if (count<=1){
            SensorsDataAPI.sharedInstance().track(eventName);
        }else {
            for (int i=0;i<count;i++){
                SensorsDataAPI.sharedInstance().track(eventName+i);
            }
        }
    }

    private void trackBigEvent(String value){
        int count=0;
        String eventName;
        if (value.equals("")){
            return;
        }
        if (value.contains("MM")){
            SensorsDataAPI.sharedInstance().track(value,bigObject);
        }else {
            try {
                count=Integer.parseInt(value);
            }catch (Exception e){
            }
        }
        if (count>1){
            for (int i=0;i<count;i++){
                if (i<10){
                    eventName="MM00"+i;
                }else {
                    if (i<100){
                        eventName="MM0"+i;
                    }else {
                        eventName="MM"+i;
                    }
                }
                SensorsDataAPI.sharedInstance().track(eventName,bigObject);
            }
        }
    }
}
