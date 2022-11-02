import React from 'react';
import * as zod from 'zod';
import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod'; // '@hookform/resolvers' faz a integração do react-hook-form com o zod, vc pode escolher outro validador também (joi, yup)

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>; // cria a tipagem a partir do objeto do zod

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
}

export const Home: React.FC = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, formState, reset } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    if (activeCycle) {
      setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate)
        );
      }, 1000);
    }
  }, [activeCycle]);

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime()); // pega a data atual e transforma em milisegundos, assim teremos um id diferente para cada ciclo

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]); // clousures, usar dessa forma quando precisa dos estados anteriores, é equivalente ao [..cycles, newCycle]
    setActiveCycleId(id);

    reset(); // limpa todos os campos do form voltando-os para o valor definido no defaultValues
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60); // arrendonda a divisão para baixo
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0'); // define que tem que ter no mínimo 2 caracteres, caso não tenha o zero será colocado na frente
  const seconds = String(secondsAmount).padStart(2, '0');

  console.log(formState.errors); // mostra todos os erros do formulário

  const task = watch('task'); // pega o valor atual do input task
  const isSubmitDisable = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')} // registra os campos que o form terá
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Banana" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5} /* faz com que seja adicionado de 5 em 5 */
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })} // por padrão o valor digitado no input será retornado pelo register como uma string, então o valueAsNumber força a ser um number
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisable} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
};
