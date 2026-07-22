'use client';
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AnimatedField } from '@/components/ui/AnimatedField';
import { FormSuccessCard } from '@/components/ui/FormSuccessCard';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

const contactSchema = z.object({
  name: z.string().min(1, "This one's needed."),
  email: z.string().email("That doesn't look like an email. Check for a typo?"),
  projectType: z.enum(['tattoo', 'painting', 'sketch', 'other']),
  brief: z.string().min(20, "A little more, please. Even two lines help us help you."),
  // Since we can't easily validate FileList instances over RSC boundaries, we just accept any for now on client side
  references: z.any().optional(), 
  consent: z.boolean().refine(v => v, "Please agree to the privacy policy."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      projectType: 'other',
      brief: '',
      consent: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          projectType: data.projectType,
          brief: data.brief,
        }), // Note: skipping file uploads for JSON payload for now
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
        title="Sent." 
        message="We've got it. We reply within 48 hours. — Prerna" 
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full">
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

      <Select
        label="Project Type"
        {...register('projectType')}
        error={errors.projectType?.message}
        options={[
          { label: 'Tattoo', value: 'tattoo' },
          { label: 'Painting', value: 'painting' },
          { label: 'Sketch', value: 'sketch' },
          { label: 'Other', value: 'other' },
        ]}
      />

      <AnimatedField
        label="The Brief (Tell us what you have in mind)"
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
        {errors.references?.message && (
          <span className="text-body-xs text-red-500">{String(errors.references.message)}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="contact-consent" className="flex items-center gap-3 cursor-pointer group">
          <input
            id="contact-consent"
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
        Send
      </Button>
    </form>
  );
}
