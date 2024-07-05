'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { accounts } from '@/lib/types';
import Dialogbox from './Dialogbox';

const DialogButtons = () => {
  const [dialogType, setDialogType] = useState<accounts | null>(null);

  const handleOpenDialog = (type: accounts) => {
    setDialogType(type);
  };

  return (
    <div className="flex gap-3">
      <Button onClick={() => handleOpenDialog("income")}>Income</Button>
      <Button onClick={() => handleOpenDialog("expense")}>Expense</Button>
      {dialogType && <Dialogbox types={dialogType} />}
    </div>
  );
};

export default DialogButtons;
