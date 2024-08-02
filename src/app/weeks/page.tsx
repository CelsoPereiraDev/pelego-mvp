'use client';

import { useWeek } from '@/services/weeks/useWeek';
import { useWeeks } from '@/services/weeks/useWeeks';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const WeeksList: React.FC = () => {
  const { weeks, isLoading, error } = useWeeks();
  const [deletingWeekId, setDeletingWeekId] = useState<string | null>(null);
  const { delete: deleteWeek } = useWeek(deletingWeekId || '');

  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yy');
  };

  const goToWeekPage = (weekId: string) => {
    router.push(`/week/${weekId}`);
  };

  const handleDelete = async (weekId: string) => {
    try {
      console.log("🆑 ~ handleDelete ~ weekId:", weekId);
      setDeletingWeekId(weekId);
    } catch (error) {
      alert('Erro ao deletar semana');
    }
  };

  useEffect(() => {
    const deleteSelectedWeek = async () => {
      if (deletingWeekId) {
        try {
          console.log("🆑 ~ useEffect ~ deletingWeekId:", deletingWeekId);
          await deleteWeek();
          alert('Semana deletada com sucesso');
          setDeletingWeekId(null);
        } catch (error) {
          alert('Erro ao deletar semana');
          setDeletingWeekId(null);
        }
      }
    };
    deleteSelectedWeek();
  }, [deletingWeekId, deleteWeek]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-screen bg-[#212121] w-screen flex justify-start flex-col p-12 items-center gap-7">
      <h1 className="text-3xl text-center mb-9 text-white">Semanas</h1>
      <ul className="p-6 bg-white min-h-full rounded-lg overflow-auto flex flex-col gap-3">
        {weeks?.map((week, index) => (
          <li
            key={week.id}
            className="text-black flex flex-row gap-4 cursor-pointer justify-between"
          >
            <div onClick={() => goToWeekPage(week.id)}>
              <span>Semana {index + 1}</span>
              <span>{formatDate(week.date)}</span>
            </div>
            <button 
              className="text-red-500"
              onClick={() => handleDelete(week.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeksList;
