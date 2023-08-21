package com.sensorsdata.analytics.android.test.fragment;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.CheckedTextView;
import android.widget.CompoundButton;
import android.widget.LinearLayout;
import android.widget.RadioGroup;
import android.widget.RatingBar;
import android.widget.SeekBar;
import android.widget.Spinner;
import android.widget.Switch;
import android.widget.ToggleButton;

import com.sensorsdata.analytics.android.sdk.ScreenAutoTracker;
import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;
import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.utils.FileController;

import org.json.JSONException;
import org.json.JSONObject;


public class ViewClickFragment extends Fragment implements View.OnClickListener, AdapterView.OnItemClickListener, CompoundButton.OnCheckedChangeListener, SeekBar.OnSeekBarChangeListener, RatingBar.OnRatingBarChangeListener, RadioGroup.OnCheckedChangeListener, AdapterView.OnItemSelectedListener, ScreenAutoTracker {

    private CheckedTextView checkedTextView;
    View view;
    JSONObject properties=new JSONObject();


    public ViewClickFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        view  = inflater.inflate(R.layout.fragment_view_click, container, false);
        view.findViewById(R.id.tv_click).setOnClickListener(this);
        view.findViewById(R.id.et_click).setOnClickListener(this);
        view.findViewById(R.id.btn_click).setOnClickListener(this);
        view.findViewById(R.id.imageButton_click).setOnClickListener(this);
        view.findViewById(R.id.imageButton_click2).setOnClickListener(this);
        view.findViewById(R.id.cb_click).setOnClickListener(this);
        view.findViewById(R.id.rb_click).setOnClickListener(this);
        ((Switch)view.findViewById(R.id.switch_click)).setOnCheckedChangeListener(this);
        ((ToggleButton)view.findViewById(R.id.toggle_click)).setOnCheckedChangeListener(this);
        checkedTextView=view.findViewById(R.id.ctv_click);
        checkedTextView.setOnClickListener(this);
        view.findViewById(R.id.iv_click).setOnClickListener(this);
        ((Spinner)view.findViewById(R.id.spinner)).setOnItemSelectedListener(this);
        view.findViewById(R.id.seekbar_click).setOnClickListener(this);
        ((SeekBar)view.findViewById(R.id.seekbar_click)).setOnSeekBarChangeListener(this);
        ((RatingBar)view.findViewById(R.id.ratingbar_click)).setOnRatingBarChangeListener(this);
        ((RadioGroup)view.findViewById(R.id.rg_click)).setOnCheckedChangeListener(this);
        //java代码中，新增一个button
//        Button button=new Button(this.getActivity());


        return view;
    }

    @Override
    public void onClick(View v) {
        if (v==null){
            return;
        }
        if (v.getId()==R.id.ctv_click){
            checkedTextView.toggle();
            Button button=new Button(getActivity());
            button.setText("新增");
            button.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT));
            LinearLayout layout=view.findViewById(R.id.lin_btn);
            layout.addView(button);
            button.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {



                }
            });

        }

    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

    }

    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {

    }

    @Override
    public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {

    }

    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {

    }

    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {
        System.out.println("sear");

    }

    @Override
    public void onRatingChanged(RatingBar ratingBar, float rating, boolean fromUser) {

    }

    @Override
    public void onCheckedChanged(RadioGroup group, int checkedId) {

    }

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {

    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }

    @Override
    public String getScreenUrl() {
        return "url_111";
    }

    @Override
    public JSONObject getTrackProperties() throws JSONException {

        //使用trackViewScreen，自定义属性时，$screen_name\$title，修改的值，$AppClick 会随之改变，但其他值不会改变（例如其他预置属性、其他自定义属性）
        properties.put("haha","123");
        properties.put("$screen_name","name_viewClick");
        properties.put("$title","title_viewClick");
//        properties.put("$os","test_os");
        return properties;
    }
}
