import React, { useState, ChangeEvent } from 'react';
import { MedicalReport, Page } from '../types';
import { ArrowLeftIcon, DocumentPlusIcon, DocumentArrowDownIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';

interface MedicalReportsPageProps {
  setPage: (page: Page) => void;
}

const mockReports: MedicalReport[] = [
    { id: 'rep1', title: 'Annual Checkup Results', date: '2023-10-15', fileUrl: '#', fileName: 'checkup_2023.pdf' },
    { id: 'rep2', title: 'Blood Test Report', date: '2023-08-22', fileUrl: '#', fileName: 'bloodwork_aug23.pdf' },
    { id: 'rep3', title: 'X-Ray Scan - Left Arm', date: '2023-05-01', fileUrl: '#', fileName: 'xray_arm.jpg' },
];

const MedicalReportsPage: React.FC<MedicalReportsPageProps> = ({ setPage }) => {
    const { t } = useLanguage();
    const [reports, setReports] = useState<MedicalReport[]>(mockReports);
    const [newReportFile, setNewReportFile] = useState<File | null>(null);
    const [newReportTitle, setNewReportTitle] = useState('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewReportFile(e.target.files[0]);
        }
    };

    const handleAddReport = () => {
        if (newReportFile && newReportTitle) {
            const newReport: MedicalReport = {
                id: `rep${Date.now()}`,
                title: newReportTitle,
                date: new Date().toISOString().split('T')[0],
                fileUrl: URL.createObjectURL(newReportFile),
                fileName: newReportFile.name,
            };
            setReports([newReport, ...reports]);
            setNewReportFile(null);
            setNewReportTitle('');
        }
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-950 min-h-full">
            <div className="max-w-4xl mx-auto">
                <header className="flex items-center mb-6">
                    <button onClick={() => setPage(Page.PROFILE)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-3 interactive-press">
                        <ArrowLeftIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('reports_title')}</h1>
                </header>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('reports_add_new')}</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder={t('reports_report_title')}
                            value={newReportTitle}
                            onChange={(e) => setNewReportTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                         <label className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 interactive-press">
                           <DocumentPlusIcon className="w-5 h-5" />
                           <span className="truncate">{newReportFile ? newReportFile.name : t('reports_choose_file')}</span>
                           <input type="file" className="hidden" onChange={handleFileChange} />
                         </label>
                        <button
                            onClick={handleAddReport}
                            disabled={!newReportFile || !newReportTitle}
                            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 disabled:bg-gray-400 interactive-press"
                        >
                            {t('reports_add')}
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {reports.map(report => (
                        <div key={report.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex items-center justify-between animate-fade-in-up">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                                    <DocumentTextIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">{report.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('reports_date')}: {report.date} | {report.fileName}</p>
                                </div>
                            </div>
                            <a href={report.fileUrl} download={report.fileName} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100 interactive-press">
                                <DocumentArrowDownIcon className="h-6 w-6" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MedicalReportsPage;
