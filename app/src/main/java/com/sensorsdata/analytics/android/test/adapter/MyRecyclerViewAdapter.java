package com.sensorsdata.analytics.android.test.adapter;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.Switch;
import android.widget.TextView;

import com.sensorsdata.analytics.android.test.R;
import com.sensorsdata.analytics.android.test.model.Data;

import java.util.List;


public class MyRecyclerViewAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder>{

    private List<Data> list;//数据源
    private Context context;//上下文

    public MyRecyclerViewAdapter(List<Data> list, Context context) {
        this.list = list;
        this.context = context;
    }
    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        //选择类型
        switch (viewType){
            case Data.TYPE_BUTTON:
                View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_button,parent,false);
                return new ButtonViewHolder(view);
            case Data.TYPE_SWITCH:
                view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_switch,parent,false);
                return new SwitchViewHolder(view);
        }
        return null;
    }

    //绑定数据
    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {

        int type= getItemViewType(position);
        if (type==Data.TYPE_BUTTON){
            ButtonViewHolder viewHolder= (ButtonViewHolder) holder;
            viewHolder.title.setText(list.get(position).getTitle());
        }

        if (type==Data.TYPE_SWITCH){
            SwitchViewHolder viewHolder= (SwitchViewHolder) holder;
            viewHolder.title.setText(list.get(position).getTitle());
            viewHolder.sw.setChecked(list.get(position).isCheck());
        }
    }

    //有多少个item？
    @Override
    public int getItemCount() {
        return list.size();
    }

    //item类型
    @Override
    public int getItemViewType(int position) {
        return list.get(position).getType();
    }

    @Override
    public long getItemId(int position) {
        return position;
    }


    //=======================以下为item中的button控件点击事件处理===================================

    //第一步：自定义一个回调接口来实现Click和LongClick事件
    public interface OnItemClickListener  {
        void onItemClick(int position);
//        void onItemLongClick(View v);
    }

    public interface OnItemCheckedChangeListener{
        void onItemCheckedChange(boolean b,int pos);
    }

    //第二步：声明自定义的接口
    public OnItemClickListener mOnItemClickListener;
    public OnItemCheckedChangeListener mOnItemCheckedChangeListener;

    //第三步：定义方法并暴露给外面的调用者
    public void setOnItemClickListener(OnItemClickListener  listener) {
        this.mOnItemClickListener  = listener;
    }

    public void setOnItemCheckedChangeListener(OnItemCheckedChangeListener listener){
        this.mOnItemCheckedChangeListener=listener;
    }

    //Button类型
    class ButtonViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        private TextView title;
        private Button btn;
        public ButtonViewHolder(View itemView) {
            super(itemView);
            title=itemView.findViewById(R.id.init_b_tv);
            btn=itemView.findViewById(R.id.init_btn);
            // 为item及item内部控件添加点击事件
//            itemView.setOnClickListener(this);
            btn.setOnClickListener(this);
        }
        @Override
        public void onClick(View v) {
            if (mOnItemClickListener != null) {
                mOnItemClickListener.onItemClick(getAdapterPosition());
            }
        }
    }

    //Switch类型
    class SwitchViewHolder extends RecyclerView.ViewHolder{
        private TextView title;
        private Switch sw;
        public SwitchViewHolder(View itemView) {
            super(itemView);
            title=itemView.findViewById(R.id.init_s_tv);
            sw=itemView.findViewById(R.id.init_sw);
            sw.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
                @Override
                public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                    if (mOnItemCheckedChangeListener!=null){
                        mOnItemCheckedChangeListener.onItemCheckedChange(b,getAdapterPosition());
                    }
                }
            });
        }
    }


}
