'use client';

import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWeek } from '@/services/weeks/useWeek';
import { useWeeks } from '@/services/weeks/useWeeks';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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

  const goToCreateMatch = () => {
    router.push('/match');
  };

  const handleDelete = async (weekId: string) => {
    try {
      setDeletingWeekId(weekId);
    } catch (error) {
      alert('Erro ao deletar semana');
    }
  };

  useEffect(() => {
    const deleteSelectedWeek = async () => {
      if (deletingWeekId) {
        try {
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
    <div className="min-h-screen bg-[hsl(var(--background))] w-screen flex justify-start flex-col p-12 items-center gap-7">
      <h1 className="text-3xl text-center mb-9 text-[hsl(var(--foreground))]">Semanas</h1>
      <Card className="p-6 min-h-full rounded-lg overflow-auto min-w-[80%]">
        <div className="mb-8 w-full flex justify-end">
          <button className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] p-3 w-[200px] rounded flex flex-row gap-1 items-center justify-center" onClick={goToCreateMatch}> 
            <AddIcon/> 
            <span>Adicionar Semana</span>
          </button>
        </div>
        <ul className="flex flex-col gap-3">
          {weeks?.map((week, index) => (
            <li
              key={week.id}
              className="text-[hsl(var(--foreground))] flex flex-row gap-4 cursor-pointer justify-between p-2 border-[1px] border-[hsl(var(--primary))] rounded"
            >
              <div  className='flex flex-col gap-2' onClick={() => goToWeekPage(week.id)}>
                <span className="text-xl">Semana {index + 1}</span>
                <span className='flex flex-row items-start'>
                  <div className="mr-2 h-4 w-4">
                    <CalendarMonthIcon />
                  </div>
                  <span className='mt-[2px]'>: {formatDate(String(week.date))}</span>
                </span>
              </div>
        
              <Dialog>
                <DialogTrigger>
                  <button
                    className="text-[hsl(var(--destructive))]"
                  >
                    <DeleteOutlineIcon />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-[hsl(var(--foreground))]">Você tem certeza que quer excluir as partidas da Semana {index + 1}?</DialogTitle>
                    <DialogDescription className="text-[hsl(var(--muted-foreground))]">
                      Essa ação não poderá ser desfeita. Você irá permanentemente deletar os dados relacionados à esta semana também
                    </DialogDescription>
                  </DialogHeader>
                   <button
                    className="bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] p-3 w-[200px] rounded flex flex-row gap-1 items-center"
                    onClick={() => handleDelete(week.id)}
                  >
                     <DeleteOutlineIcon />
                    <div>Deletar Semana {index + 1} </div>
                  </button>
                </DialogContent>
              </Dialog>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default WeeksList;
