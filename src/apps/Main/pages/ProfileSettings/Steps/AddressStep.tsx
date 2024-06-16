import * as z from 'zod';
import {
  FC,
} from 'react';
import { useTranslation, } from 'react-i18next';
import { zodResolver, } from '@hookform/resolvers/zod';
import { useForm, Controller, SubmitHandler, } from 'react-hook-form';

import Business from '@mui/icons-material/Business';

import {
  Button,
  MenuItem,
  TextField,
  Typography,
} from '@theme/main';

import {
  Address,
  AddressSchema,
} from '@apps/Main/schemas/AddressSchema';

import { 
  ADDRESS_STEP, 
  CommonStepProps, 
} from '..';

import StepContainer from '../Components/StepContainer';

type AddressStepProps = object & CommonStepProps;

const AddressStep: FC<AddressStepProps> = ({
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
  } = useForm<Address>({
    resolver: zodResolver(AddressSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<Address> = (values) => {
    console.log(values);
    
    onActionTriggered('step', ADDRESS_STEP);
  };

  return (
    <section className='w-full h-auto overflow-y-auto'>
      <div className='h-full p-6 flex flex-col gap-y-8'>
        <StepContainer
          title={t(`profileSettings.steps.${ADDRESS_STEP}.address.subtitle`)}
          subtitle={t(`profileSettings.steps.${ADDRESS_STEP}.address.description`)}>
          <div className='grow h-full flex flex-col p-6 border border-juridica-gray-100 shadow-sm rounded-lg gap-y-8'>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start max-w-96 w-auto gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${ADDRESS_STEP}.formatted.title`)}
                </Typography>
                <Typography
                  variant='body1'
                  className='text-sm font-primary'>
                  {t(`profileSettings.steps.${ADDRESS_STEP}.formatted.description`)}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-3 gap-x-6 gap-y-4'>
                <div className='col-span-3'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                        {...field}
                        clipboard
                        disabled={AddressSchema.shape.formatted._def.innerType instanceof z.ZodReadonly}
                        variant='outlined'
                        color='primary'
                        InputProps={{
                          startAdornment: <Business />
                        }}
                        label={t(`profileSettings.steps.${ADDRESS_STEP}.formatted.label`)}
                        placeholder={t(`profileSettings.steps.${ADDRESS_STEP}.formatted.placeholder`)}
                        error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                        helperText={fieldState?.error && fieldState?.error?.message}
                        required={AddressSchema.shape.formatted instanceof z.ZodOptional} />
                    )}
                    control={control}
                    name='formatted'
                    defaultValue={''} />
                </div>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${ADDRESS_STEP}.location.title`)}
                </Typography>
                <Typography
                  variant='body1'
                  className='text-sm font-primary'>
                  {t(`profileSettings.steps.${ADDRESS_STEP}.location.description`)}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-2 gap-x-6 gap-y-4'>
                <div className='col-span-2'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                        {...field}
                        select
                        SelectProps={{
                          className: 'font-primary-alt text-sm'
                        }}
                        disabled={AddressSchema.shape.country._def.innerType instanceof z.ZodReadonly}
                        variant='outlined'
                        color='primary'
                        label={t(`profileSettings.steps.${ADDRESS_STEP}.location.country.label`)}
                        placeholder={t(`profileSettings.steps.${ADDRESS_STEP}.location.country.placeholder`)}
                        error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                        helperText={fieldState?.error && fieldState?.error?.message}
                        required={AddressSchema.shape.country instanceof z.ZodOptional}>
                          <MenuItem className='font-primary-alt text-[15px]'>
                            
                          </MenuItem>
                        </TextField>
                    )}
                    control={control}
                    name='country'
                    defaultValue={''} />
                </div>
                <div className='col-span-1'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                        {...field}
                        select
                        SelectProps={{
                          className: 'font-primary-alt text-sm'
                        }}
                        disabled={AddressSchema.shape.region._def.innerType instanceof z.ZodReadonly}
                        variant='outlined'
                        color='primary'
                        label={t(`profileSettings.steps.${ADDRESS_STEP}.location.region.label`)}
                        placeholder={t(`profileSettings.steps.${ADDRESS_STEP}.location.region.placeholder`)}
                        error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                        helperText={fieldState?.error && fieldState?.error?.message}
                        required={AddressSchema.shape.region instanceof z.ZodOptional}>
                          <MenuItem className='font-primary-alt text-[15px]'>
                            
                          </MenuItem>
                        </TextField>
                    )}
                    control={control}
                    name='region'
                    defaultValue={''} />
                </div>
                <div className='col-span-1'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                        {...field}
                        select
                        SelectProps={{
                          className: 'font-primary-alt text-sm'
                        }}
                        disabled={AddressSchema.shape.locality._def.innerType instanceof z.ZodReadonly}
                        variant='outlined'
                        color='primary'
                        label={t(`profileSettings.steps.${ADDRESS_STEP}.location.locality.label`)}
                        placeholder={t(`profileSettings.steps.${ADDRESS_STEP}.location.locality.placeholder`)}
                        error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                        helperText={fieldState?.error && fieldState?.error?.message}
                        required={AddressSchema.shape.locality instanceof z.ZodOptional}>
                          <MenuItem className='font-primary-alt text-[15px]'>
                            
                          </MenuItem>
                        </TextField>
                    )}
                    control={control}
                    name='locality'
                    defaultValue={''} />
                </div>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${ADDRESS_STEP}.complement.title`)}
                </Typography>
                <Typography
                  variant='body1'
                  className='text-sm font-primary'>
                  {t(`profileSettings.steps.${ADDRESS_STEP}.complement.description`)}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-2 gap-x-6 gap-y-4'>
                <div className='col-span-1'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                        {...field}
                        disabled={AddressSchema.shape.street._def.innerType instanceof z.ZodReadonly}
                        variant='outlined'
                        color='primary'
                        label={t(`profileSettings.steps.${ADDRESS_STEP}.complement.street.label`)}
                        placeholder={t(`profileSettings.steps.${ADDRESS_STEP}.complement.street.placeholder`)}
                        error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                        helperText={fieldState?.error && fieldState?.error?.message}
                        required={AddressSchema.shape.street instanceof z.ZodOptional} />
                    )}
                    control={control}
                    name='street'
                    defaultValue={''} />
                </div>
                <div className='col-span-1'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                        {...field}
                        disabled={AddressSchema.shape.streetComplement._def.innerType instanceof z.ZodReadonly}
                        variant='outlined'
                        color='primary'
                        label={t(`profileSettings.steps.${ADDRESS_STEP}.complement.streetComplement.label`)}
                        placeholder={t(`profileSettings.steps.${ADDRESS_STEP}.complement.streetComplement.placeholder`)}
                        error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                        helperText={fieldState?.error && fieldState?.error?.message}
                        required={AddressSchema.shape.streetComplement instanceof z.ZodOptional} />
                    )}
                    control={control}
                    name='streetComplement'
                    defaultValue={''} />
                </div>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${ADDRESS_STEP}.zip.title`)}
                </Typography>
                <Typography
                  variant='body1'
                  className='text-sm font-primary'>
                  {t(`profileSettings.steps.${ADDRESS_STEP}.zip.description`)}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-3 gap-x-6 gap-y-4'>
                <div className='col-span-2'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                        {...field}
                        disabled={AddressSchema.shape.postalCode._def.innerType instanceof z.ZodReadonly}
                        variant='outlined'
                        color='primary'
                        label={t(`profileSettings.steps.${ADDRESS_STEP}.zip.label`)}
                        placeholder={t(`profileSettings.steps.${ADDRESS_STEP}.zip.placeholder`)}
                        error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                        helperText={fieldState?.error && fieldState?.error?.message}
                        required={AddressSchema.shape.postalCode instanceof z.ZodOptional} />
                    )}
                    control={control}
                    name='postalCode'
                    defaultValue={''} />
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
      </div>
    </section>
  );
};

export default AddressStep;