import { api } from '@/trpc/server';
import React from 'react'

export default async function PredictionsCounterComponent() {
    const predictions = await api.prediction.getTotalPredictions.query();

  return (
    <h2 className="text-lg text-gray-300">We got you, {predictions} predictions 🔮</h2>

  )
}
