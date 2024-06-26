import * as z from 'zod';
import { format } from 'date-fns';
import { 
  FC, 
  useState, 
  useEffect,
} from 'react';
import { useRecoilValue, } from 'recoil';
import { zodResolver, } from '@hookform/resolvers/zod';
import { 
  useForm, 
  Controller, 
  SubmitHandler, 
} from 'react-hook-form';
import { useTranslation, } from 'react-i18next';
import { useService, } from '@redtea/react-inversify';

import Pen from '@mui/icons-material/Edit';
import Badge from '@mui/icons-material/Badge';
import Person from '@mui/icons-material/Person';
import Numeric from '@mui/icons-material/Grid3x3';
import At from '@mui/icons-material/AlternateEmail';

import { 
  Button,
  MenuItem,
  TextField,
  Typography,
  DatePicker,
} from '@theme/main';

import Picture from '@Shared/Components/Picture';

import { User } from '@contexts/shared/domain/models';
import { 
  GENDER_TYPE, 
  GenderType, 
  IDENTIFICATION_TYPE, 
} from '@contexts/shared/domain/value-objects';
import { UpdateAccountPort, } from '@contexts/user/application/ports/UpdateAccountPort';

import { profileState, } from '@apps/Main/state/atoms';
import { 
  PublicProfile, 
  PublicProfileSchema, 
} from '@apps/Main/schemas/PublicProfileSchema';

import { 
  PersonalInformation, 
  PersonalInformationSchema, 
} from '@apps/Main/schemas/PersonalInformationSchema';

import { 
  PROFILE_STEP, 
  CommonStepProps, 
} from '..';

import StepContainer from './StepContainer';

const FormSchema = PublicProfileSchema
  .merge(PersonalInformationSchema);

type Form = PublicProfile & PersonalInformation;

type PictureAction = {
  rawImage: any;
  imageUrl: string;
}

type ProfileStepProps = object & CommonStepProps;

const ProfileStep: FC<ProfileStepProps> = ({
  onActionTriggered,
}) => {
  const { t, } = useTranslation();

  const [loading, setLoading,] = useState<boolean>(false);

  const profile = useRecoilValue<Partial<User>>(profileState);

  const updateAccountUseCase = useService<UpdateAccountPort>('UpdateAccountUseCase');

  const {
    control,
    formState: {
      isValid,
      isValidating,
    },
    watch,
    reset,
    setValue,
    handleSubmit,
  } = useForm<Form>({
    resolver: zodResolver(FormSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<Form> = async (values) => {
    setLoading(true);
    await updateAccountUseCase.updateUserData({
      ...values,
    });
    
    setLoading(false);
    onActionTriggered('step', PROFILE_STEP);
  };
  
  const handleProfilePictureChanged: (action: PictureAction) => void = (a) => {
    const { rawImage, } = a;
    setValue('photo', rawImage, { 
      shouldValidate: true, 
    });
  };

  useEffect(() => {
    // TODO: CONVERT THIS TO BUILDER OR SOMETHING SCALABLE
    reset({
      ...profile,
    });

    return () => {};
  }, [profile, reset,])

  return (
    <section className='w-full h-auto overflow-y-auto'>
      <div className='h-full p-6 flex flex-col gap-y-8'>
        <StepContainer
          title={t(`profileSettings.steps.${PROFILE_STEP}.publicProfile.subtitle`)}
          subtitle={t(`profileSettings.steps.${PROFILE_STEP}.publicProfile.description`)}>
          <div className='grow h-full flex flex-col p-6 border border-juridica-gray-100 shadow-sm rounded-lg gap-y-8'>
            <div className='flex gap-x-6 pb-6 border-b border-b-juridica-gray-100'>
              <Picture 
                isReadonly 
                file={{
                  src: profile?.photo 
                }}
                alt={profile?.name ?? 'Profile photo'}
                className='w-48 h-48'
                icon={<Pen className='text-2xl text-juridica-50'/>}
                action={handleProfilePictureChanged} />
              <div className='flex flex-col gap-y-1'>
                <Typography
                  variant='h2'
                  className='text-xl font-primary font-bold capitalize text-juridica-gray-900'>
                  {profile?.name}
                </Typography>
                <Typography
                  variant='body1'
                  className='text-lg font-primary-alt font-medium text-juridica-400'>
                  {t(`common.personTypes.${profile?.personType}`)}
                </Typography>
              </div>
              <div className='self-end ml-auto'>
                <Typography
                  variant='body1'
                  className='text-sm font-bold text-juridica-gray-500'>
                  {t('common.dates.lastUpdate', { date: format(profile?.updatedAt ? new Date(profile?.updatedAt) : new Date(), 'Pp') })}
                </Typography>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${PROFILE_STEP}.preferredUsername.title`)}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-2 gap-x-6 gap-y-4'>
                <div className='col-span-full'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                        {...field}
                        disabled
                        clipboard
                        variant='outlined'
                        color='primary'
                        InputProps={{
                          startAdornment: <Numeric/>
                        }}
                        label={t(`profileSettings.steps.${PROFILE_STEP}.id.label`)}
                        placeholder={t(`profileSettings.steps.${PROFILE_STEP}.id.placeholder`)}
                        error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                        helperText={fieldState?.error && fieldState?.error?.message} 
                        required={PublicProfileSchema.shape.id instanceof z.ZodOptional } />
                      )} 
                      control={control}
                      name='id'
                      defaultValue={profile?.id ?? ''} />
                </div>
                <div className='col-span-1'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                        {...field}
                        disabled
                        variant='outlined'
                        color='primary'
                        InputProps={{
                          startAdornment: <At/>
                        }}
                        label={t(`profileSettings.steps.${PROFILE_STEP}.email.label`)}
                        placeholder={t(`profileSettings.steps.${PROFILE_STEP}.email.placeholder`)}
                        error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                        helperText={fieldState?.error && fieldState?.error?.message} 
                        required={PublicProfileSchema.shape.email instanceof z.ZodOptional } />
                      )} 
                    control={control}
                    name='email'
                    defaultValue={profile?.email ?? ''} />
                </div>
                <div className='col-span-1'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                        {...field}
                        disabled
                        clipboard
                        variant='outlined'
                        color='primary'
                        InputProps={{
                          startAdornment: <Person/>
                        }}
                        label={t(`profileSettings.steps.${PROFILE_STEP}.preferredUsername.label`)}
                        placeholder={t(`profileSettings.steps.${PROFILE_STEP}.preferredUsername.placeholder`)}
                        error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                        helperText={fieldState?.error && fieldState?.error?.message} 
                        required={PublicProfileSchema.shape.preferredUsername instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='preferredUsername'
                    defaultValue={profile?.preferredUsername ?? ''} />
                </div>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${PROFILE_STEP}.fullName.title`)}
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
                      label={t(`profileSettings.steps.${PROFILE_STEP}.givenName.label`)}
                      placeholder={t(`profileSettings.steps.${PROFILE_STEP}.givenName.placeholder`)}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={PublicProfileSchema.shape.givenName instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='givenName'
                    defaultValue={profile?.givenName ?? ''} />
                </div>
                <div className='col-span-1'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                      {...field}
                      variant='outlined'
                      color='primary'
                      label={t(`profileSettings.steps.${PROFILE_STEP}.middleName.label`)}
                      placeholder={t(`profileSettings.steps.${PROFILE_STEP}.middleName.placeholder`)}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={PublicProfileSchema.shape.middleName instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='middleName'
                    defaultValue={profile?.middleName ?? ''} />
                </div>
                <div className='col-span-2'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                      {...field}
                      variant='outlined'
                      label={t(`profileSettings.steps.${PROFILE_STEP}.familyName.label`)}
                      placeholder={t(`profileSettings.steps.${PROFILE_STEP}.familyName.placeholder`)}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={PublicProfileSchema.shape.familyName instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='familyName'
                    defaultValue={profile?.familyName ?? ''} />
                </div>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${PROFILE_STEP}.biography.title`)}
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
                      label={t(`profileSettings.steps.${PROFILE_STEP}.biography.label`)}
                      placeholder={t(`profileSettings.steps.${PROFILE_STEP}.biography.placeholder`)}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={PublicProfileSchema.shape.biography instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='biography'
                    defaultValue={profile?.biography ?? ''} />
                </div>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${PROFILE_STEP}.birthdate.title`)}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-2 gap-x-6'>
                <div className='col-span-2'>
                  <Controller 
                    render={({ field, fieldState, }) => (
                      <DatePicker 
                        {...field}
                        disabled
                        slotProps={{
                          textField: {
                            error: fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched),
                          }
                        }} />
                    )}
                    control={control}
                    name='birthdate'
                    defaultValue={new Date(profile?.birthdate)} />
                </div>
              </div>
            </div>
            <div className='mt-2'>
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
        <StepContainer
          title={t(`profileSettings.steps.${PROFILE_STEP}.personalInformation.subtitle`)}
          subtitle={t(`profileSettings.steps.${PROFILE_STEP}.personalInformation.description`)}>
          <div className='grow h-full flex flex-col p-6 border border-juridica-gray-100 shadow-sm rounded-lg gap-y-8'>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${PROFILE_STEP}.identification.title`)}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-2 gap-x-6 gap-y-4'>
                <div className='col-span-1'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                      {...field}
                      disabled
                      select
                      variant='outlined'
                      color='primary'
                      InputProps={{
                        startAdornment: <Badge/>
                      }}
                      label={t(`profileSettings.steps.${PROFILE_STEP}.identification.identificationType.label`)}
                      placeholder={t(`profileSettings.steps.${PROFILE_STEP}.identification.identificationType.placeholder`)}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={PersonalInformationSchema.shape.identificationType instanceof z.ZodOptional }>
                        {Object.entries(IDENTIFICATION_TYPE).map(([key, value]) => (
                          <MenuItem key={key} value={value.codeName}>
                            {t(`common.identificationTypes.${key}`)}
                          </MenuItem>
                        ))}
                      </TextField>
                    )} 
                    control={control}
                    name='identificationType'
                    defaultValue={profile?.identificationType?.codeName ?? 'CC'} />
                </div>
                <div className='col-span-1'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                      {...field}
                      disabled
                      clipboard
                      variant='outlined'
                      color='primary'
                      label={t(`profileSettings.steps.${PROFILE_STEP}.identification.identificationNumber.label`)}
                      placeholder={t(`profileSettings.steps.${PROFILE_STEP}.identification.identificationNumber.placeholder`)}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={PersonalInformationSchema.shape.identificationNumber instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='identificationNumber'
                    defaultValue={profile?.identificationNumber ?? ''} />
                </div>
                <div className='col-span-full'>
                  <Controller 
                    render={({ field, fieldState, }) => (
                      <DatePicker 
                        {...field}
                        label={t(`profileSettings.steps.${PROFILE_STEP}.identification.identificationIssueDate.label`)}
                        disabled
                        slotProps={{
                          textField: {
                            error: fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched),
                          }
                        }} />
                    )}
                    control={control}
                    name='identificationIssueDate'
                    defaultValue={new Date(profile?.identificationIssueDate)} />
                </div>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${PROFILE_STEP}.phone.title`)}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-3 gap-x-6 gap-y-4'>
                <div className='col-span-1'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                      {...field}
                      variant='outlined'
                      color='primary'
                      label={t(`profileSettings.steps.${PROFILE_STEP}.phone.phoneNumberPrefix.label`)}
                      placeholder={t(`profileSettings.steps.${PROFILE_STEP}.phone.phoneNumberPrefix.placeholder`)}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={PersonalInformationSchema.shape.phoneNumberPrefix instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='phoneNumberPrefix'
                    defaultValue={profile?.phoneNumberPrefix ?? ''} />
                </div>
                <div className='col-span-2'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                      {...field}
                      variant='outlined'
                      color='primary'
                      label={t(`profileSettings.steps.${PROFILE_STEP}.phone.phoneNumber.label`)}
                      placeholder={t(`profileSettings.steps.${PROFILE_STEP}.phone.phoneNumber.placeholder`)}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={PersonalInformationSchema.shape.phoneNumber instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='phoneNumber'
                    defaultValue={profile?.phoneNumber ?? ''} />
                </div>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${PROFILE_STEP}.gender.title`)}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-3 gap-x-6 gap-y-4'>
                <div className='col-span-1'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                      {...field}
                      select
                      variant='outlined'
                      color='primary'
                      label={t(`profileSettings.steps.${PROFILE_STEP}.gender.label`)}
                      placeholder={t(`profileSettings.steps.${PROFILE_STEP}.gender.placeholder`)}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={PersonalInformationSchema.shape.phoneNumberPrefix instanceof z.ZodOptional }>
                        {Object.entries(GENDER_TYPE).map(([key, value]) => (
                          <MenuItem key={key} value={value.codeName}>
                            {t(`common.genderTypes.${value.codeName}`)}
                          </MenuItem>
                        ))}
                      </TextField>
                    )} 
                    control={control}
                    name='gender'
                    defaultValue={profile?.gender ?? GENDER_TYPE.MALE.codeName} />
                </div>
              </div>
            </div>
            <div className='mt-2'>
              <Button
                loading={isValidating || loading}
                disabled={!isValid || loading}
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

export default ProfileStep;