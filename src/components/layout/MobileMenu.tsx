'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { primaryNav } from '@/config/nav';

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-ink/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-[101] flex w-[80vw] max-w-sm flex-col bg-ink-primary p-6 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm">
          <div className="flex items-center justify-end">
            <Dialog.Close className="flex h-8 w-8 items-center justify-center rounded-full text-ivory transition-colors hover:bg-ink-border focus:outline-none focus:ring-2 focus:ring-inchworm" aria-label="Close menu">
              <X size={20} strokeWidth={1.5} />
            </Dialog.Close>
          </div>
          <nav className="mt-8 flex flex-col gap-2">
            {primaryNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    'block py-4 font-display text-body-lg tracking-wide transition-colors',
                    isActive ? 'text-inchworm' : 'text-ivory hover:text-inchworm'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
