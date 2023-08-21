package com.sensorsdata.analytics.android.test.fragment;


import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.Spinner;
import android.widget.Switch;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.sdk.SensorsDataIgnoreTrackAppViewScreenAndAppClick;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.activity.HomeActivity;
import com.sensorsdata.analytics.android.test.activity.ViewActivity;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.FileController;

import java.util.ArrayList;
import java.util.List;

@SensorsDataIgnoreTrackAppViewScreenAndAppClick
public class VisualizedFragment extends Fragment implements Switch.OnCheckedChangeListener,View.OnClickListener, AdapterView.OnItemSelectedListener {

    private Switch sw;
    private Spinner vis_sp1,vis_sp2;
    private Button btn_add,btn_judge,btn_isopen,btn_open;
    private View view;
    //待开启的activity
    private String[] adds={"null","ViewActivity","HomeActivity","TimeOutDateActivity","所有"};
    //待判断的activity
    private String[] judges={"null","ViewActivity","HomeActivity","TimeOutDateActivity"};
    private ArrayAdapter<String> adapter1,adapter2;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_visualized,container, false);
        initView();
        initEvent();
        initData();
        Common.loge("本页面使用以下注解:@SensorsDataIgnoreTrackAppViewScreenAndAppClick");
        return view;
    }

    private void initView(){
        sw=view.findViewById(R.id.vis_sw);
        vis_sp1=view.findViewById(R.id.vis_sp1);
        vis_sp2=view.findViewById(R.id.vis_sp2);
        btn_add=view.findViewById(R.id.btn_add);
        btn_judge=view.findViewById(R.id.btn_judge);
        btn_isopen=view.findViewById(R.id.btn_isopen);
        btn_open=view.findViewById(R.id.btn_open);
    }

    private void initEvent(){
        sw.setOnCheckedChangeListener(this);
        vis_sp1.setOnItemSelectedListener(this);
        vis_sp2.setOnItemSelectedListener(this);
        btn_add.setOnClickListener(this);
        btn_judge.setOnClickListener(this);
        btn_isopen.setOnClickListener(this);
        btn_open.setOnClickListener(this);
    }

    private void initData(){
        adapter1 =new ArrayAdapter<>(this.getActivity(),android.R.layout.simple_spinner_item,adds);
        vis_sp1.setAdapter(adapter1);
        adapter2 =new ArrayAdapter<>(this.getActivity(),android.R.layout.simple_spinner_item,judges);
        vis_sp2.setAdapter(adapter2);
    }

    @Override
    public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
        //根据开关设置
//        SensorsDataAPI.sharedInstance().enableVisualizedAutoTrackConfirmDialog(b);
//        FileController.getFileControl().writeToLogFile("enableVisualizedAutoTrackConfirmDialog(bool)",b+"",null);
    }

    @Override
    public void onClick(View view) {

        if (view.getId()==R.id.btn_add){
            //添加Activity到可视化全埋点
            Class<?> activity=null;
            switch (vis_sp1.getSelectedItemPosition()){
                case 0:
                    activity=null;
                    break;
                case 1:
                    activity=ViewActivity.class;
                    break;
                case 2:
                    activity=HomeActivity.class;
                    break;
                case 3:
                    break;
                case 4:
                    List<Class<?>> activitiesList=new ArrayList<>();
                    activitiesList.add(ViewActivity.class);
                    activitiesList.add(HomeActivity.class);
                    SensorsDataAPI.sharedInstance().addVisualizedAutoTrackActivities(activitiesList);
//                    FileController.getFileControl().writeToLogFile("addVisualizedAutoTrackActivities(activitiesList)","所有Activity",null);
                    break;
            }
            if (vis_sp1.getSelectedItemPosition()!=4){
                SensorsDataAPI.sharedInstance().addVisualizedAutoTrackActivity(activity);
//                FileController.getFileControl().writeToLogFile("addVisualizedAutoTrackActivity(activity)",activity+"",null);
            }
        }

        if (view.getId()==R.id.btn_judge){
            //判断某个Activity是否开启可视化全埋点
            Boolean value=false;
            Class<?> activity=null;
            switch (vis_sp2.getSelectedItemPosition()){
                case 0:
                    activity=null;
                    break;
                case 1:
                    activity=ViewActivity.class;
                    break;
                case 2:
                    activity=HomeActivity.class;
                    break;
                case 3:
                    break;
            }
            value=SensorsDataAPI.sharedInstance().isVisualizedAutoTrackActivity(activity);
            Common.toast(getContext(),value+"");
//            FileController.getFileControl().writeToLogFile("isVisualizedAutoTrackActivity(activity)",activity+"",value+"");
        }
        if (view.getId()==R.id.btn_isopen){
            Boolean result=SensorsDataAPI.sharedInstance().isVisualizedAutoTrackEnabled();
//            FileController.getFileControl().writeToLogFile("isVisualizedAutoTrackEnabled()",null,result+"");
            Common.toast(this.getActivity().getApplicationContext(),"状态:"+result);
        }
        if (view.getId()==R.id.btn_open){
//            SensorsDataAPI.sharedInstance().enableVisualizedAutoTrack();
//            FileController.getFileControl().writeToLogFile("enableVisualizedAutoTrack()",null,null);
        }

    }

    @Override
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {

    }

    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {

    }
}
