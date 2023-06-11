package com.example.trafficfeed.data

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import com.example.trafficfeed.model.TrafficNotification
import kotlinx.coroutines.flow.Flow

@Dao
interface TrafficNotificationDao {
    @Insert()
    fun insertAll(notifications: List<TrafficNotification>)

    @Query("SELECT * FROM notifications")
    fun getAll(): Flow<List<TrafficNotification>>
}