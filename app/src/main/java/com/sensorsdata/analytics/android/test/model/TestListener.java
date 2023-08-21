package com.sensorsdata.analytics.android.test.model;

import android.content.DialogInterface;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.CompoundButton;
import android.widget.ExpandableListView;
import android.widget.RadioGroup;
import android.widget.RadioGroup.OnCheckedChangeListener;
import android.widget.RatingBar;
import android.widget.SeekBar;
import android.widget.TabHost;

public class TestListener implements View.OnClickListener, CompoundButton.OnCheckedChangeListener, OnCheckedChangeListener, RatingBar.OnRatingBarChangeListener , SeekBar.OnSeekBarChangeListener , AdapterView.OnItemClickListener , ExpandableListView.OnGroupClickListener, ExpandableListView.OnChildClickListener , TabHost.OnTabChangeListener , MenuItem.OnMenuItemClickListener, DialogInterface.OnClickListener {

    @Override
    public void onClick(View view) {

    }

    @Override
    public void onCheckedChanged(CompoundButton compoundButton, boolean b) {

    }

    @Override
    public void onCheckedChanged(RadioGroup radioGroup, int i) {

    }

    @Override
    public void onRatingChanged(RatingBar ratingBar, float v, boolean b) {

    }

    @Override
    public void onProgressChanged(SeekBar seekBar, int i, boolean b) {

    }

    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {

    }

    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {

    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {

    }

    @Override
    public boolean onGroupClick(ExpandableListView expandableListView, View view, int i, long l) {
        return false;
    }

    @Override
    public boolean onChildClick(ExpandableListView expandableListView, View view, int i, int i1, long l) {
        return false;
    }

    @Override
    public void onTabChanged(String s) {

    }

    @Override
    public boolean onMenuItemClick(MenuItem menuItem) {
        return false;
    }

    @Override
    public void onClick(DialogInterface dialogInterface, int i) {

    }
}
