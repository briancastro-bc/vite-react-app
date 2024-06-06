import * as z from 'zod';
import { FC, } from 'react';
import { zodResolver, } from '@hookform/resolvers/zod';
import { 
  useForm, 
  Controller, 
  SubmitHandler, 
} from 'react-hook-form';
import { useTranslation, } from 'react-i18next';

import Pen from '@mui/icons-material/Edit';
import Person from '@mui/icons-material/Person';

import { 
  Button,
  TextField,
  Typography,
} from '@theme/main';

import Picture from '@Shared/Components/Picture';

import { 
  PublicProfile, 
  PublicProfileSchema, 
} from '@apps/Main/schemas/PublicProfileSchema';

import { 
  PersonalInformation, 
  PersonalInformationSchema, 
} from '@apps/Main/schemas/PersonalInformationSchema';

import { CommonStepProps, } from '..';

import StepContainer from '../Components/StepContainer';

const FormSchema = PublicProfileSchema
  .merge(PersonalInformationSchema);

type Form = PublicProfile & PersonalInformation;

type PublicProfileStepProps = object & CommonStepProps;

const PublicProfileStep: FC<PublicProfileStepProps> = ({
  onActionTriggered,
}) => {
  const { t, } = useTranslation();

  const {
    control,
    formState: {
      isValid,
      isValidating,
    },
    handleSubmit,
  } = useForm<Form>({
    resolver: zodResolver(FormSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<Form> = (value) => {
    console.log('submit', value);

    onActionTriggered('next');
  };

  return (
    <section className='w-full h-auto overflow-y-auto'>
      <div className='h-full p-6'>
        <StepContainer
          title={t('profileSettings.steps.0.subtitle')}
          subtitle={t('profileSettings.steps.0.description')}>
          <div className='grow h-full flex flex-col p-6 border border-juridica-gray-100 shadow-sm rounded-lg gap-y-8'>
            <div className='pb-6 border-b border-b-juridica-gray-100'>
              <Picture 
                isReadonly 
                alt=''
                className='w-48 h-48'
                icon={<Pen className='text-2xl text-juridica-50'/>}
                action={(e) => console.log(e)} />
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t('profileSettings.steps.0.preferredUsername.title')}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-2 gap-x-6 gap-y-4'>
                <div className='col-span-1'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                      {...field}
                      disabled
                      clipboard
                      value={'Textooo'}
                      variant='outlined'
                      color='primary'
                      InputProps={{
                        startAdornment: <Person/>
                      }}
                      label={t('profileSettings.steps.0.preferredUsername.label')}
                      placeholder={t('profileSettings.steps.0.preferredUsername.placeholder')}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={PublicProfileSchema.shape.preferredUsername instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='preferredUsername'
                    defaultValue={''} />
                </div>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t('profileSettings.steps.0.fullName.title')}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-2 gap-x-6 gap-y-4'>
                <div className='col-span-1'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                      {...field}
                      variant='outlined'
                      color='primary'
                      label={t('profileSettings.steps.0.givenName.label')}
                      placeholder={t('profileSettings.steps.0.givenName.placeholder')}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={PublicProfileSchema.shape.givenName instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='givenName'
                    defaultValue={''} />
                </div>
                <div className='col-span-1'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                      {...field}
                      variant='outlined'
                      color='primary'
                      label={t('profileSettings.steps.0.middleName.label')}
                      placeholder={t('profileSettings.steps.0.middleName.placeholder')}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={PublicProfileSchema.shape.middleName instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='middleName'
                    defaultValue={''} />
                </div>
                <div className='col-span-2'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                      {...field}
                      variant='outlined'
                      label={t('profileSettings.steps.0.familyName.label')}
                      placeholder={t('profileSettings.steps.0.familyName.placeholder')}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={PublicProfileSchema.shape.familyName instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='familyName'
                    defaultValue={''} />
                </div>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t('profileSettings.steps.0.biography.title')}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-2 gap-x-6'>
                <div className='col-span-2'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                      {...field}
                      multiline
                      rows={3}
                      InputProps={{
                        className: 'p-0'
                      }}
                      variant='outlined'
                      color='primary'
                      label={t('profileSettings.steps.0.biography.label')}
                      placeholder={t('profileSettings.steps.0.biography.placeholder')}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={PublicProfileSchema.shape.biography instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='biography'
                    defaultValue={''} />
                </div>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t('profileSettings.steps.0.birthdate.title')}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-2 gap-x-6'>
                <div className='col-span-2'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                      {...field}
                      type='date'
                      variant='outlined'
                      color='primary'
                      label={t('profileSettings.steps.0.birthdate.label')}
                      placeholder={t('profileSettings.steps.0.birthdate.placeholder')}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={PublicProfileSchema.shape.birthdate instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='birthdate'
                    defaultValue={new Date()} />
                </div>
              </div>
            </div>
            <div className='mt-4'>
              <Button
                loading={isValidating}
                disabled={!isValid}
                size='large'
                variant='contained'
                onClick={handleSubmit(onSubmit)}>
                {t('common.buttons.save')}
              </Button>
            </div>
          </div>
        </StepContainer>
      </div>
    </section>
  )
};

export default PublicProfileStep;