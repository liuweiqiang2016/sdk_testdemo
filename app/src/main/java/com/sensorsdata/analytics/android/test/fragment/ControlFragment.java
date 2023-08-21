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
import android.widget.ListView;
import android.widget.Spinner;

import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.AutoTrack;
import com.sensorsdata.analytics.android.test.utils.Common;
import com.sensorsdata.analytics.android.test.utils.FileController;

import java.util.ArrayList;
import java.util.List;

/*
 * 测试fragment的全埋点相关控制
 * */

public class ControlFragment extends Fragment implements View.OnClickListener, AdapterView.OnItemSelectedListener, AdapterView.OnItemClickListener {

    private View view;
    private Button btn_execute;
    private Spinner sp1,sp2;
    private ArrayAdapter<String> adapter1,adapter2,adapter3;
    private ListView listView;
    private AutoTrack autoTrack=new AutoTrack();
    //用例集合
    private String[] cases={"开启某个Fragment采集","判断某个Fragment是否采集","忽略某个Fragment采集","恢复某个Fragment采集"};
    //fragment(string)
    private String[] strings={"TrackFragment","SuperPropertiesFragment","TimerFragment","LogFragment","null"};
    //fragment(class)
    private Class[] classes={TrackFragment.class,SuperPropertiesFragment.class,TimerFragment.class,LogFragment.class,null};
    //listView上的数据
    private String[] datas={"开启Fragment采集","Fragment采集是否开启","开启List<Fragment>采集","忽略List<Fragment>采集","恢复List<Fragment>采集"};
    //fragment集合
    private List<Class> fragments = new ArrayList<>();


    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view= inflater.inflate(R.layout.fragment_control, container, false);
        initViews();//初始化控件
        initEvents();//初始化事件
        initData();//初始化数据

        return view;
    }

    private void initViews(){

        btn_execute=view.findViewById(R.id.fragment_execute);
        sp1=view.findViewById(R.id.fragment_sp1);
        sp2=view.findViewById(R.id.fragment_sp2);
        listView=view.findViewById(R.id.fragment_lv);
    }

    private void initEvents(){

        btn_execute.setOnClickListener(this);
        sp1.setOnItemSelectedListener(this);
        sp2.setOnItemSelectedListener(this);
        listView.setOnItemClickListener(this);
    }

    private void  initData(){

        adapter1 =new ArrayAdapter<>(this.getActivity(),android.R.layout.simple_spinner_item,cases);
        sp1.setAdapter(adapter1);
        adapter2 =new ArrayAdapter<>(this.getActivity(),android.R.layout.simple_spinner_item,strings);
        sp2.setAdapter(adapter2);
        adapter3=new ArrayAdapter<>(this.getActivity(),android.R.layout.simple_list_item_1,datas);
        listView.setAdapter(adapter3);
        if (fragments.size()==0){
            fragments.add(TrackFragment.class);
            fragments.add(SuperPropertiesFragment.class);
        }
    }

    @Override
    public void onClick(View view) {
        //根据sp1和sp2的位置,传入不同参数，执行不同接口
        if (view.getId()==R.id.fragment_execute){
            int pos1=sp1.getSelectedItemPosition();
            int pos2=sp2.getSelectedItemPosition();
            String api=null,param=strings[pos2],response=null;
            switch (pos1){
                case 0:
                    //开启某个fragment采集
                    autoTrack.enableFragment_class(classes[pos2]);
                    Common.toast(getContext(),"开启fragment采集");
                    api="enableAutoTrackFragment(fragment)";
                    break;
                case 1:
                    //判断某个fragment是否采集
                    boolean b=autoTrack.isFragmentTrack(classes[pos2]);
                    Common.toast(getContext(),"该fragment开启状态为:"+b);
                    api="isFragmentAutoTrackAppViewScreen(fragment)";
                    response=b+"";
                    break;
                case 2:
                    //忽略某个fragment采集
                    SensorsDataAPI.sharedInstance().ignoreAutoTrackFragment(classes[pos2]);
                    Common.toast(getContext(),"该fragment被忽略");
                    api="ignoreAutoTrackFragment(fragment)";
                    break;
                case 3:
                    //恢复某个fragment采集
                    SensorsDataAPI.sharedInstance().resumeIgnoredAutoTrackFragment(classes[pos2]);
                    Common.toast(getContext(),"该fragment被恢复");
                    api="resumeIgnoredAutoTrackFragment(fragment)";
                    break;
            }
//            FileController.getFileControl().writeToLogFile(api,param,response);
        }
    }


    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int i, long l) {

    }

    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {

    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
        String api=null,param=null,response=null;
        switch (i){
            case 0:
                //开启Fragment采集
                autoTrack.fragmentAppviewScreen();
                Common.toast(getContext(),"开启Fragment采集");
                api="trackFragmentAppViewScreen()";
                break;
            case 1:
                //Fragment采集是否开启
                boolean b=autoTrack.isFragmentAutoTrack();
                Common.toast(getContext(),"Fragment采集是否开启:"+b);
                api="isTrackFragmentAppViewScreenEnabled()";
                response=b+"";
                break;
            case 2:
                //开启List<Fragment>采集
                autoTrack.enableFragment_list(fragments);
                Common.toast(getContext(),"开启List<Fragment>采集");
                api="enableAutoTrackFragments(fragments)";
                param="TrackFragment,SuperPropertiesFragment";
                break;
            case 3:
                //忽略List<Fragment>采集
                SensorsDataAPI.sharedInstance().ignoreAutoTrackFragments((List)fragments);
                Common.toast(getContext(),"忽略List<Fragment>采集");
                api="ignoreAutoTrackFragments(fragments)";
                param="TrackFragment,SuperPropertiesFragment";
                break;
            case 4:
                //恢复List<Fragment>采集
                SensorsDataAPI.sharedInstance().resumeIgnoredAutoTrackFragments((List)fragments);
                Common.toast(getContext(),"恢复List<Fragment>采集");
                api="resumeIgnoredAutoTrackFragments(fragments)";
                param="TrackFragment,SuperPropertiesFragment";
                break;
        }
//        FileController.getFileControl().writeToLogFile(api,param,response);
    }
}
