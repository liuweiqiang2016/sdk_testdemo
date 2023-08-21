package com.sensorsdata.analytics.android.test.fragment;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.sensorsdata.analytics.android.sdk.SensorsDataAutoTrackAppViewScreenUrl;
import com.sensorsdata.analytics.android.sdk.SensorsDataFragmentTitle;
import com.sensorsdata.analytics.android.sdk.SensorsDataIgnoreTrackOnClick;
import com.sensorsdata.analytics.android.sdk.SensorsDataTrackEvent;
import com.sensorsdata.analytics.android.sdk.SensorsDataTrackViewOnClick;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.Common;

@SensorsDataFragmentTitle(title = "123456")
@SensorsDataAutoTrackAppViewScreenUrl(url ="www.AnnotationFragment.com" )
public class AnnotationFragment extends Fragment implements View.OnClickListener {

    private Button btn_track_normal,btn_track_illegal;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceStateApp) {
        View view = inflater.inflate(R.layout.fragment_annotation, container, false);
        btn_track_normal=view.findViewById(R.id.btn_track_normal);
        btn_track_illegal=view.findViewById(R.id.btn_track_illegal);
        btn_track_illegal.setOnClickListener(this);
        btn_track_normal.setOnClickListener(this);
        Common.loge("本页面使用了以下注解:@SensorsDataFragmentTitle(title = 123456),@SensorsDataAutoTrackAppViewScreenUrl(url =www.AnnotationFragment.com),@SensorsDataIgnoreTrackOnClick,@SensorsDataTrackEvent");
        return view;
    }


    //备注：前提是开启全埋点的$AppClick
    @SensorsDataIgnoreTrackOnClick
    @Override
    public void onClick(View view) {
        if (view.getId()==R.id.btn_track_normal){
            testAnnotationTrue();
        }
        if (view.getId()==R.id.btn_track_illegal){
            testAnnotationFalse();
        }
    }

    @SensorsDataTrackEvent(eventName = "ClickTrue",properties = "{\"hero\":\"HERO\"}")
    public void testAnnotationTrue(){
        Common.toast(getContext(),"正确注解收集事件");
    }

    @SensorsDataTrackEvent(eventName = "ClickFalse",properties = "{hero:HERO,nu}")
    public void testAnnotationFalse(){
        Common.toast(getContext(),"错误注解收集事件");
    }
}

