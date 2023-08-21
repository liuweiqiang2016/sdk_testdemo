package com.sensorsdata.analytics.android.test.fragment;


import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ListView;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.sdk.SensorsNetworkType;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.adapter.NetTypeAdapter;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.FileController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


/*
* 网络上传策略的fragment
* */
public class NetworkPolicyFragment extends Fragment implements View.OnClickListener {

    private ListView listView;
    private View view;
    private Button btn;
    //网络类型
    private List<String> types = Arrays.asList("2G","3G", "4G","5G","WIFI","ALL", "NONE", "-1");
    private List<Integer> values = Arrays.asList(SensorsNetworkType.TYPE_2G,SensorsNetworkType.TYPE_3G,SensorsNetworkType.TYPE_4G,SensorsNetworkType.TYPE_5G,SensorsNetworkType.TYPE_WIFI,SensorsNetworkType.TYPE_ALL,SensorsNetworkType.TYPE_NONE,-1);
    private List<Boolean> checks=new ArrayList<>();
    private NetTypeAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_network_policy, container, false);
        initView();
        initEvent();
        initData();
        return view;
    }

    private void initView(){
        listView=view.findViewById(R.id.ty_lv);
        btn=view.findViewById(R.id.btn_set1);
    }

    private void initEvent(){
        btn.setOnClickListener(this);
    }

    private void initData(){
        //构建网络类型选择初始化数据
        //防止其他页面切换导致checks不断增加的问题
        if (checks.size()==0){
            checks.add(false);
            checks.add(true);
            checks.add(true);
            checks.add(true);
            checks.add(true);
            checks.add(false);
            checks.add(false);
            checks.add(false);
        }
        adapter=new NetTypeAdapter(getContext(),types,checks);
        listView.setAdapter(adapter);

    }

    @Override
    public void onClick(View view) {
        if (view.getId()==R.id.btn_set1){
            //如果都不选
            boolean result=false;
            for (Boolean value:checks){
                result=result|value;
            }
            if (!result){
                Common.toast(getContext(),"网络策略不能为空!");
                return;
            }
            //最后三项只允许单选
            //为-1
            int value=0;
            if (checks.get(checks.size()-1)){
                setNetworkPolicy(values.get(values.size()-1));
                return;
            }
            if (checks.get(checks.size()-2)){
                setNetworkPolicy(values.get(values.size()-2));
                return;
            }
            if (checks.get(checks.size()-3)){
                setNetworkPolicy(values.get(values.size()-3));
                return;
            }
            for (int i=0;i<checks.size()-3;i++){
                if (checks.get(i)){
                    value=value|values.get(i);
                }
            }
            setNetworkPolicy(value);
        }
    }

    private void setNetworkPolicy(int value){
        SensorsDataAPI.sharedInstance().setFlushNetworkPolicy(value);
//        FileController.getFileControl().writeToLogFile("setFlushNetworkPolicy(value)",value+"",null);
        Common.toast(getContext(),"网络上传策略设置成功!");
    }
}
