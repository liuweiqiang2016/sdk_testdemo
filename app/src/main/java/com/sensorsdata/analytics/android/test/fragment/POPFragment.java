package com.sensorsdata.analytics.android.test.fragment;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.alibaba.fastjson.JSONArray;
import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.sdk.SensorsDataFragmentTitle;
import com.sensorsdata.analytics.android.sdk.dialog.SensorsDataDialogUtils;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.FileController;
import com.sensorsdata.sf.core.SensorsFocusAPI;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/*
* 测试 SF 弹窗的 Fragment
* */

@SensorsDataFragmentTitle(title = "title_pop")
public class POPFragment extends Fragment implements AdapterView.OnItemClickListener {

    private ListView listView;
    private ArrayList<String> list;
    private ArrayAdapter<String> adapter;
    private View view;
    private String[] eventNames;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_pop, container, false);
        initData();
        initView();
        initEvents();
        return view;
    }

    private void initData(){
        eventNames=new String[]{"android_start","android_end","pushTest","sf_search","sf_clickProduct","$WebClick","sf_favorite","sf_add","sf_cancel","sf_pay","sf_see","sf_person","sf_logout","sf_music"};
    }

    private void initView(){
        listView=view.findViewById(R.id.pop_lv);
        adapter=new ArrayAdapter<String>(this.getContext(),android.R.layout.simple_list_item_1,eventNames);
        listView.setAdapter(adapter);
    }

    private void initEvents(){
        listView.setOnItemClickListener(this);
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
        System.out.println(eventNames[i]);

//        SensorsDataDialogUtils.showPairingCodeInputDialog(getContext());
//        for (int a = 0; a <98 ; a++) {
//
//            SensorsDataAPI.sharedInstance().track("aaa"+a);
//
//        }



//        Common.requestChannelUrl(getContext());
//        SensorsDataAPI.sharedInstance().track(eventNames[i]);

//        if (i==1){
//            SensorsFocusAPI.sharedInstance().enablePopup();
//        }else {
//            SensorsDataAPI.sharedInstance().track(eventNames[i]);
//        }

//        if (i==13){
//            mHandler.sendEmptyMessageDelayed(1,5000);
//        }else {
//            SensorsDataAPI.sharedInstance().track(eventNames[i]);
//        }


    }

    @SuppressLint("HandlerLeak")
    private Handler mHandler=new Handler(){
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            if (msg.what==1){
                SensorsDataAPI.sharedInstance().track("pushTest");
            }
        }
    };


}
