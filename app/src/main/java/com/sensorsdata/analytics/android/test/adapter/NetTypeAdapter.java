package com.sensorsdata.analytics.android.test.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckBox;
import android.widget.CompoundButton;

import com.sensorsdata.analytics.android.test.R;

import java.util.List;

public class NetTypeAdapter extends BaseAdapter {

    private List<String> titles;
    public List<Boolean> checks;
    private Context mContext;
    private ViewHolder holder = null;

    public NetTypeAdapter(Context context, List<String> titles, List<Boolean> checks) {
        this.mContext =context;
        this.titles = titles;
        this.checks=checks;
    }

    @Override
    public View getView(final int position, View convertView, ViewGroup parent){
        if (convertView==null){
            convertView = LayoutInflater.from(mContext).inflate(R.layout.item_network,parent,false);
            holder = new ViewHolder();
            holder.cb = convertView.findViewById(R.id.pw_cb);
            convertView.setTag(holder);
        }else {
            holder = (ViewHolder)convertView.getTag();
        }
        holder.cb.setText(titles.get(position));
        //解决checkBox数据紊乱问题
        holder.cb.setOnCheckedChangeListener(null);
        holder.cb.setChecked(checks.get(position));
        holder.cb.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                checks.set(position,b);
            }
        });
        return convertView;
    }

    @Override
    public int getCount() {
        return titles.size();
    }

    @Override
    public Object getItem(int pos) {
        return null;
    }

    @Override
    public long getItemId(int pos) {
        return pos;
    }

    public List<Boolean> getChecks(){
        return this.checks;
    }
    static class ViewHolder {
        CheckBox cb;
    }
}
