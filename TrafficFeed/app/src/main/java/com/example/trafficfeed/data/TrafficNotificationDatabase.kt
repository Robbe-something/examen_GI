package com.example.trafficfeed.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.example.trafficfeed.model.TrafficNotification

@Database(entities = [TrafficNotification::class], version = 1, exportSchema = false)
abstract class TrafficNotificationDatabase : RoomDatabase() {
    abstract fun trafficNotificationDao(): TrafficNotificationDao

    companion object {
        @Volatile
        private var Instance: TrafficNotificationDatabase? = null

        fun getDatabase(context: Context): TrafficNotificationDatabase {
            return Instance ?: synchronized(this){
                Room.databaseBuilder(context, TrafficNotificationDatabase::class.java, "traffic_notification_database")
                    .fallbackToDestructiveMigration()
                    .build()
                    .also{Instance = it}
            }
        }
    }

}