package com.example.trafficfeed.data

import com.example.trafficfeed.model.TrafficNotification
import kotlinx.coroutines.flow.Flow

class TrafficNotificationRepository(private val trafficNotificationDao: TrafficNotificationDao) {
    fun getAllStream(): Flow<List<TrafficNotification>> = trafficNotificationDao.getAll()

    suspend fun insertAll(notifications: List<TrafficNotification>) = trafficNotificationDao.insertAll(notifications)
}