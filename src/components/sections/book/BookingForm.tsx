'use client';
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AnimatedField } from '@/components/ui/AnimatedField';
import { FormSuccessCard } from '@/components/ui/FormSuccessCard';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { site } from '@/config/site';

const bookingSchema = z.object({
  projectType: z.enum(['tattoo', 'painting', 'sketch', 'other']),
  bodyArea: z.enum(['arm', 'back', 'chest', 'leg', 'rib', 'neck', 'hand', 'ankle', 'wrist', 'none']).optional(),
  preferredMonth: z.string().min(1, 'Please select a preferred month.'),
  brief: z.string().min(20, "A little more, please. Even two lines help us help you."),
  references: z.any().optional(),
  name: z.string().min(1, "This one's needed."),
  email: z.string().email("That doesn't look like an email. Check for a typo?"),
  phone: z.string().optional(),
  consent: z.boolean().refine(v => v, "Please agree to the privacy policy."),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      projectType: 'tattoo',
      bodyArea: 'arm',
      preferredMonth: '',
      brief: '',
      name: '',
      email: '',
      phone: '',
      consent: false,
    },
  });

  const projectType = useWatch({ control, name: 'projectType' });

  const onSubmit = async (data: BookingFormValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <FormSuccessCard
        title="Request received."
        message={`We will review your brief and get back to you within ${site.booking.responseWindow}. If approved, we will send a calendar link to secure your deposit.`}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <AnimatedField
          label="Your Name"
          {...register('name')}
          error={errors.name?.message}
        />
        
        <AnimatedField
          label="Email Address"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
         <AnimatedField
           label="Phone (Optional)"
           type="tel"
           {...register('phone')}
           error={errors.phone?.message}
         />

         <Select
           label="Preferred Month"
           {...register('preferredMonth')}
           error={errors.preferredMonth?.message}
           options={[
             { label: 'Next Month', value: 'next' },
             { label: 'In 2 Months', value: '2months' },
             { label: 'In 3 Months', value: '3months' },
           ]}
         />
      </div>

      <Select
        label="Project Type"
        {...register('projectType')}
        error={errors.projectType?.message}
        options={[
          { label: 'Tattoo', value: 'tattoo' },
          { label: 'Painting Commission', value: 'painting' },
          { label: 'Sketch Commission', value: 'sketch' },
          { label: 'Other', value: 'other' },
        ]}
      />

      {projectType === 'tattoo' && (
        <Select
          label="Body Area"
          {...register('bodyArea')}
          error={errors.bodyArea?.message}
          options={[
            { label: 'Arm', value: 'arm' },
            { label: 'Back', value: 'back' },
            { label: 'Chest', value: 'chest' },
            { label: 'Leg', value: 'leg' },
            { label: 'Rib', value: 'rib' },
            { label: 'Neck', value: 'neck' },
            { label: 'Hand', value: 'hand' },
            { label: 'Ankle', value: 'ankle' },
            { label: 'Wrist', value: 'wrist' },
          ]}
        />
      )}

      <AnimatedField
        label="The Brief (Describe the concept, size, and constraints)"
        type="textarea"
        {...register('brief')}
        error={errors.brief?.message}
      />

      <div className="flex flex-col gap-2">
        <label className="text-body-sm text-ivory-dim">References (Optional, Max 5)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          className="text-body-sm text-ivory-dim file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-body-sm file:font-medium file:bg-ink-80 file:text-ivory hover:file:bg-ink-70"
          {...register('references')}
        />
      </div>

      <div className="flex flex-col gap-2">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="booking-consent" className="flex items-center gap-3 cursor-pointer group">
          <input
            id="booking-consent"
            type="checkbox"
            className="w-4 h-4 rounded-sm border-ink-20 bg-transparent text-inchworm focus:ring-inchworm focus:ring-offset-ink"
            {...register('consent')}
          />
          <span className="text-body-sm text-ivory-dim group-hover:text-ivory transition-colors">
            I agree to the privacy policy.
          </span>
        </label>
        {errors.consent?.message && (
          <span className="text-body-xs text-red-500">{errors.consent.message}</span>
        )}
      </div>

      {status === 'error' && (
        <div className="text-body-sm text-red-500 bg-red-500/10 p-4 rounded-sm" aria-live="polite">
          Something on our end. Try again, or write to studio@meetprerna.com directly.
        </div>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto self-start" loading={status === 'loading'}>
        Submit Brief
      </Button>
    </form>
  );
}
