package com.sensorsdata.analytics.android.test.fragment;


import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import com.sensorsdata.analytics.android.sdk.SAConfigOptions;
import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.adapter.MyRecyclerViewAdapter;
import com.sensorsdata.analytics.android.test.model.Data;

import java.util.ArrayList;
import java.util.List;


public class InitFragment extends Fragment implements View.OnClickListener, AdapterView.OnItemSelectedListener {

    private RecyclerView recyclerView;
    private MyRecyclerViewAdapter adapter;
    private List<Data> list;
    private View view;
    private Spinner sp;
    private Button btn;
    private EditText et;
    private String SA_SERVER_URL = "http://sdktest.datasink.sensorsdata.cn/sa?project=liuweiqiang&token=21f2e56df73988c7";
    //配置项集合
    private String[] configs = {"设置匿名id", "日志最大缓存条数", "日志发送间隔(ms)", "数据库最大缓存(MB)", "远程请求最大间隔(时)", "远程请求最小间隔(时)", "远程请求地址(url)", "数据上报地址(url)","设置网络策略"};
    private ArrayAdapter<String> adapter2;
    private SAConfigOptions saConfigOptions;


    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_init, container, false);
        saConfigOptions = new SAConfigOptions(SA_SERVER_URL);
        initView();
        initEvent();
        initData();

        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity(), LinearLayoutManager.VERTICAL, false));//控制布局为LinearLayout或者是GridView或者是瀑布流布局
        adapter = new MyRecyclerViewAdapter(list, getActivity());
        recyclerView.setAdapter(adapter);
        // 设置item及item中控件的点击事件
        adapter.setOnItemClickListener(MyItemClickListener);
        adapter.setOnItemCheckedChangeListener(MyItemCheckedChangeListener);

        return view;
    }

    private void initView() {
        recyclerView = view.findViewById(R.id.init_rv);
        sp = view.findViewById(R.id.init_sp);
        btn = view.findViewById(R.id.init_set);
        et=view.findViewById(R.id.init_et);
    }

    private void initEvent() {
        btn.setOnClickListener(this);
        sp.setOnItemSelectedListener(this);
    }

    private void initData() {
        list = new ArrayList<>();
        list.add(new Data(3, "开启点击图", false));
        list.add(new Data(3, "点击图警告框开启", true));
        list.add(new Data(3, "点击图检查证书", false));
        list.add(new Data(3, "打印日志", false));
        list.add(new Data(3, "屏幕方向采集", false));
        list.add(new Data(3, "开启可视化全埋点", false));
        list.add(new Data(3, "可视化全埋点警告框", true));
        list.add(new Data(3, "可视化全埋点检查证书", false));
        list.add(new Data(1, "禁用分散请求", false));
        list.add(new Data(1, "AppCrash收集", false));
        adapter2 = new ArrayAdapter<>(getActivity(), android.R.layout.simple_spinner_item, configs);
        sp.setAdapter(adapter2);
    }

    /**
     * item＋item里的控件点击监听事件
     */
    private MyRecyclerViewAdapter.OnItemClickListener MyItemClickListener = new MyRecyclerViewAdapter.OnItemClickListener() {
        @Override
        public void onItemClick(int position) {

            switch (position) {
                case 8:
                    //禁用分散请求
                    saConfigOptions.disableRandomTimeRequestRemoteConfig();
                    break;
                case 9:
                    //AppCrash 收集
                    saConfigOptions.enableTrackAppCrash();
                    break;
            }
        }
    };

    //switch 的监听
    private MyRecyclerViewAdapter.OnItemCheckedChangeListener MyItemCheckedChangeListener = new MyRecyclerViewAdapter.OnItemCheckedChangeListener() {
        @Override
        public void onItemCheckedChange(boolean b, int pos) {

            switch (pos) {
                case 0:
                    //开启点击图
                    saConfigOptions.enableHeatMap(b);
                    break;
                case 1:
                    //点击图警告框是否开启
//                    saConfigOptions.enableHeatMapConfirmDialog(b);
                    break;
                case 2:
                    //点击图是否检查证书, v3.2.11 已删除
//                    saConfigOptions.enableHeatMapSSLCheck(b);
                    break;
                case 3:
                    //打印日志
                    saConfigOptions.enableLog(b);
                    break;
                case 4:
                    //屏幕方向采集
                    saConfigOptions.enableTrackScreenOrientation(b);
                    break;
                case 5:
                    //开启可视化全埋点
                    saConfigOptions.enableVisualizedAutoTrack(b);
                    break;
                case 6:
                    //可视化全埋点警告框是否开启
//                    saConfigOptions.enableVisualizedAutoTrackConfirmDialog(b);
                    break;
                case 7:
                    //可视化全埋点检查证书,v3.2.11 已删除
//                    saConfigOptions.enableVisualizedAutoTrackSSLCheck(b);
                    break;
            }
        }
    };


    @Override
    public void onClick(View view) {
        if (view.getId() == R.id.init_set) {

            try{
                int pos = sp.getSelectedItemPosition();
                String value=et.getText().toString();

                switch (pos) {
                    case 0:
                        //设置匿名id
//                        saConfigOptions.setAnonymousId(value);
                        break;
                    case 1:
                        //日志最大缓存条数
                        saConfigOptions.setFlushBulkSize(Integer.parseInt(value));
                        break;
                    case 2:
                        //日志发送时间间隔（ms）
                        saConfigOptions.setFlushInterval(Integer.parseInt(value));
                        break;
                    case 3:
                        //数据库最大缓存（MB）
                        saConfigOptions.setMaxCacheSize(1024*1024*(Integer.parseInt(value)));
                        break;
                    case 4:
                        //远程请求最大间隔（时）
                        saConfigOptions.setMaxRequestInterval(Integer.parseInt(value));
                        break;
                    case 5:
                        //远程请求最小间隔（时）
                        saConfigOptions.setMinRequestInterval(Integer.parseInt(value));
                        break;
                    case 6:
                        //远程请求地址
                        saConfigOptions.setRemoteConfigUrl(value);
                        break;
                    case 7:
                        //数据上报地址
                        saConfigOptions.setServerUrl(value);
                        break;
                    case 8:
//                      2G：1
//                      3G：2
//                      4G：4
//                    wifi：8
//                      5G：16
//                     ALL：255
//                    NONE：0
                        //设置网络策略
                        saConfigOptions.setNetworkTypePolicy(Integer.parseInt(value));
                        break;
                }

            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
    }

    @Override
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {

    }

    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {

    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        //设置完毕后,返回销毁该 fragment 时触发
//        SensorsDataAPI.sharedInstance(getContext(), saConfigOptions);
    }
}
