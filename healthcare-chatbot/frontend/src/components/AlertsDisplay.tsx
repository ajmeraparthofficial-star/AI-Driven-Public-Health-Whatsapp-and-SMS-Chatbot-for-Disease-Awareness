import React from 'react';
import { DiseaseAlert } from '../services/alertService';

interface AlertsDisplayProps {
  alerts: DiseaseAlert[];
}

const severityStyles = {
  High: 'bg-red-500 text-red-100',
  Medium: 'bg-yellow-500 text-yellow-100',
  Low: 'bg-green-500 text-green-100',
};

const AlertCard: React.FC<{ alert: DiseaseAlert }> = ({ alert }) => {
  const severityClass = severityStyles[alert.severity] || 'bg-gray-500 text-gray-100';
  const formattedDate = new Date(alert.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-800/50 p-3 rounded-md border border-gray-600">
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-bold text-base text-pink-300">{alert.disease}</h4>
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${severityClass}`}>
          {alert.severity}
        </span>
      </div>
      <div className="text-xs text-gray-400 mb-2">
        <span>{alert.location}</span> &bull; <span>{formattedDate}</span>
      </div>
      <p className="text-sm text-gray-200">{alert.summary}</p>
      <p className="text-right text-xs text-gray-500 mt-2">Source: {alert.source}</p>
    </div>
  );
};


export const AlertsDisplay: React.FC<AlertsDisplayProps> = ({ alerts }) => {
  return (
    <div className="mt-3 pt-3 border-t border-gray-500/50 space-y-2">
      <h3 className="font-semibold text-sm text-pink-400">Current Health Alerts</h3>
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </div>
  );
};