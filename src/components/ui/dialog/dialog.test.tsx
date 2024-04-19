import { render, screen, userEvent, waitFor } from 'utils/test';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './dialog';

describe('Dialog components', () => {
  it('renders Dialog', () => {
    render(<Dialog />);
    waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
  });

  it('renders DialogClose', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogClose />
        </DialogContent>
      </Dialog>,
    );
    waitFor(() => expect(screen.getByRole('button')).toBeInTheDocument());
  });

  it('renders DialogContent', () => {
    render(
      <Dialog>
        <DialogContent />
      </Dialog>,
    );
    waitFor(() => expect(screen.getByRole('document')).toBeInTheDocument());
  });

  it('renders DialogDescription', () => {
    render(
      <Dialog>
        <DialogContent>
          <DialogDescription />
        </DialogContent>
      </Dialog>,
    );
    waitFor(() => expect(screen.getByRole('note')).toBeInTheDocument());
  });

  it('renders DialogFooter function', () => {
    render(
      <Dialog>
        <DialogContent>
          <DialogFooter />
        </DialogContent>
      </Dialog>,
    );
    waitFor(() => expect(screen.getByRole('contentinfo')).toBeInTheDocument());
  });

  it('renders DialogHeader function', () => {
    render(
      <Dialog>
        <DialogContent>
          <DialogHeader />
        </DialogContent>
      </Dialog>,
    );
    waitFor(() => expect(screen.getByRole('banner')).toBeInTheDocument());
  });

  it('renders DialogOverlay', () => {
    render(
      <Dialog>
        <DialogOverlay />
      </Dialog>,
    );
    waitFor(() => expect(screen.getByRole('presentation')).toBeInTheDocument());
  });

  it('renders DialogPortal', () => {
    render(
      <Dialog>
        <DialogPortal />
      </Dialog>,
    );
    waitFor(() => expect(screen.getByRole('region')).toBeInTheDocument());
  });

  it('renders DialogTitle', () => {
    render(
      <Dialog>
        <DialogContent>
          <DialogTitle />
        </DialogContent>
      </Dialog>,
    );
    waitFor(() => expect(screen.getByRole('heading')).toBeInTheDocument());
  });

  it('renders DialogTrigger', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
      </Dialog>,
    );
    waitFor(() => expect(screen.getByRole('button')).toBeInTheDocument());
  });

  it('closes the dialog when DialogClose is clicked', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogClose />
        </DialogContent>
      </Dialog>,
    );

    userEvent.click(screen.getByText('Open Dialog'));
    waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());

    userEvent.click(screen.getByRole('button'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
