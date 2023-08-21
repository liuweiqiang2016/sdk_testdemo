package com.sensorsdata.analytics.android.test.fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.JsonReader;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import com.sensorsdata.abtest.OnABTestReceivedData;
import com.sensorsdata.abtest.SensorsABTest;
import com.sensorsdata.abtest.SensorsABTestExperiment;
import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.sdk.SensorsDataFragmentTitle;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Common;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
 * 测试 A/B Testing SDK的 Fragment
 * */

@SensorsDataFragmentTitle(title = "title_ab")
public class ABFragment extends Fragment implements AdapterView.OnItemClickListener {

    private ListView listView;
    private ArrayList<String> list;

    private ArrayAdapter<String> adapter;
    private View view;
    private String TAG="SA.S";
    private TextView textView;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_ab, container, false);
        initData();
        initView();
        initEvents();
        return view;
    }

    private void initData(){
        list=new ArrayList<String>();
        list.add("fetchCacheABTest:只从本地读取试验");
        list.add("asyncFetchABTest:总是从网络请求试验");
        list.add("fastFetchABTest:优先从本地读取试验");
        list.add("设置自定义主体 ID");

    }

    private void initView(){
        textView=view.findViewById(R.id.ab_tv);
        listView=view.findViewById(R.id.ab_lv);
        adapter=new ArrayAdapter<String>(this.getContext(),android.R.layout.simple_list_item_1,list);
        listView.setAdapter(adapter);
    }

    private void initEvents(){
        listView.setOnItemClickListener(this);
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {

        switch (i){
            case 0:
                //只从本地读取试验信息
                System.out.println("result:"+SensorsABTest.shareInstance().fetchCacheABTest("test_bb",-100));
//                System.out.println("result:"+SensorsABTest.shareInstance().fetchCacheABTest("test_bb",-100));
//                Map<String,String> map1=new HashMap<>();
//                map1.put("custom_id","333");
//                SensorsABTest.shareInstance().setCustomIDs(map1);
                break;
            case 1:
                SensorsABTest.shareInstance().asyncFetchABTest("param14", -200,3000, new OnABTestReceivedData<Integer>() {
                    @Override
                    public void onResult(Integer integer) {
                        Log.e(TAG, "onResult: "+integer);
                        textView.setText("更新UI====asyncFetchABTest"+integer);
                    }
                });

//                SensorsABTest.shareInstance().asyncFetchABTest(
//                        SensorsABTestExperiment.newBuilder("test_bb", -200)
//                        .addProperty("ab_str22","555")
//                                .setTimeoutMillSeconds(2000)
//                                .create(),
//                        new OnABTestReceivedData<Integer>() {
//                            @Override
//                            public void onResult(Integer integer) {
//                                Log.e(TAG, "onResult: "+integer);
//                                textView.setText("更新UI====asyncFetchABTest");
//
//                            }
//                        }
//                );
//
//                SensorsABTest.shareInstance().asyncFetchABTest(
//                        SensorsABTestExperiment.newBuilder("aaa", -100)
//                                .setTimeoutMillSeconds(2000)
//                                .create(),
//                        new OnABTestReceivedData<Integer>() {
//                            @Override
//                            public void onResult(Integer integer) {
//                                Log.e(TAG, "onResult: "+integer);
//                                textView.setText("更新UI====fastFetchABTest");
//
//                            }
//                        }
//                );


//                SensorsABTest.shareInstance().asyncFetchABTest(
//                        SensorsABTestExperiment.newBuilder("int_abtest1", -200)
//                                .setTimeoutMillSeconds(2000)
//                                .create(),
//                        new OnABTestReceivedData<Integer>() {
//                            @Override
//                            public void onResult(Integer integer) {
//                                Log.e(TAG, "onResult: "+integer);
//                                textView.setText("更新UI====fastFetchABTest");
//
//                            }
//                        }
//                );

//                SensorsABTest.shareInstance().asyncFetchABTest(
//                        SensorsABTestExperiment.newBuilder("test12", -200)
//                                .setTimeoutMillSeconds(2000)
//                                .addProperty("ab_str22","555")
//                                .create(),
//                        new OnABTestReceivedData<Integer>() {
//                            @Override
//                            public void onResult(Integer integer) {
//                                Log.e(TAG, "onResult: "+integer);
//                                textView.setText("更新UI====asyncFetchABTest");
//
//                            }
//                        }
//                );

//                SensorsABTest.shareInstance().asyncFetchABTest(
//                        SensorsABTestExperiment.newBuilder("cqs_type", -300)
//                                .setTimeoutMillSeconds(2000)
//                                .create(),
//                        new OnABTestReceivedData<Integer>() {
//                            @Override
//                            public void onResult(Integer integer) {
//                                Log.e(TAG, "onResult: "+integer);
//                                textView.setText("更新UI====asyncFetchABTest");
//
//                            }
//                        }
//                );


                break;
            case 2:

//                SensorsABTest.shareInstance().fastFetchABTest(
//                        SensorsABTestExperiment.newBuilder("qddq", -200)
//                                .setTimeoutMillSeconds(2000)
//                                .create(),
//                        new OnABTestReceivedData<Integer>() {
//                            @Override
//                            public void onResult(Integer integer) {
//                                Log.e(TAG, "onResult: "+integer);
//                                textView.setText("更新UI====fastFetchABTest");
//
//                            }
//                        }
//                );


//                SensorsABTest.shareInstance().fastFetchABTest(
//                        SensorsABTestExperiment.newBuilder("test12", -400)
//                                .addProperty("ab_str22","555")
//                                .setTimeoutMillSeconds(2000)
//                                .create(),
//                        new OnABTestReceivedData<Integer>() {
//                            @Override
//                            public void onResult(Integer integer) {
//                                Log.e(TAG, "onResult: "+integer);
//                                textView.setText("更新UI====fastFetchABTest");
//
//                            }
//                        }
//                );

                SensorsABTest.shareInstance().fastFetchABTest(
                        SensorsABTestExperiment.newBuilder("cqs_type", -500)
                                .setTimeoutMillSeconds(2000)
                                .create(),
                        new OnABTestReceivedData<Integer>() {
                            @Override
                            public void onResult(Integer integer) {
                                Log.e(TAG, "onResult: "+integer);
                                textView.setText("更新UI====fastFetchABTest");

                            }
                        }
                );

//                SensorsABTest.shareInstance().fastFetchABTest(
//                        SensorsABTestExperiment.newBuilder("test_bb", -404)
//                                .addProperty("ab_str22","555")
//                                .setTimeoutMillSeconds(2000)
//                                .create(),
//                        new OnABTestReceivedData<Integer>() {
//                            @Override
//                            public void onResult(Integer integer) {
//                                Log.e(TAG, "onResult: "+integer);
//
//                                textView.setText("更新UI====fastFetchABTest");
//
//                            }
//                        }
//                );


                break;
            case 3:

                Map<String,String> map=new HashMap<>();
//                map.put("","111");
//                map.put(null,"222");
//                map.put("date","333");
//                map.put("datetime","333");
//                map.put("distinct_id","333");
//                map.put("event","333");
//                map.put("events","333");
//                map.put("event_id","333");
//                map.put("first_id","333");
//                map.put("id","333");
//                map.put("original_id","333");
//                map.put("device_id","333");
//                map.put("properties","333");
//                map.put("second_id","333");
//                map.put("time","333");
//                map.put("user_id","333");
//                map.put("users","333");
//                map.put("user_tag","333");
//                map.put("user_tag1","333");
//                map.put("user_group","333");
//                map.put("user_groupww","333");
//                map.put("12ss","333");
//                map.put("$ss","333");
//                map.put("#ss","333");
//                map.put(Common.getBigString(101),"333");
//                map.put("abc","");
//                map.put("abc",null);
//                map.put("abc",Common.getBigString(1025));
//                map.put("abc","123");
                map.put("custom_id","111");
                SensorsABTest.shareInstance().setCustomIDs(map);

//                Map<String,String> map1=new HashMap<>();
//                map1.put("ccc","333");
//                SensorsABTest.shareInstance().setCustomIDs(map);
                break;
        }
    }

}
