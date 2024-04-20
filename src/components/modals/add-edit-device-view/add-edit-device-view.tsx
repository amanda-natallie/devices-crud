import { deviceTypeConfig } from 'config/deviceTypeConfig';

import { Button } from 'components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { Input } from 'components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';

import { DevicesModalSkeleton } from './skeleton';
import useAddEditDeviceView from './use-add-edit-device-view';

function AddEditDeviceView() {
  const { actions, isEdit, formMethods, isFetching, isSubmitting, onSubmit } =
    useAddEditDeviceView();
  const selectItems = deviceTypeConfig.filter(({ id }) => id !== 'ALL');
  const { primary, secondary } = actions;

  return (
    <DialogContent className="sm:max-w-[540px]">
      <DialogHeader>
        <DialogTitle>{`${isEdit ? 'Edit' : 'Add'} Device`}</DialogTitle>
      </DialogHeader>

      {isFetching ? (
        <DevicesModalSkeleton />
      ) : (
        <Form {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={formMethods.control}
                name="system_name"
                render={({ field, fieldState: { isTouched, error } }) => (
                  <FormItem>
                    <FormLabel>System Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex.: AMANDA_DESKTOP"
                        {...field}
                        onChange={event => field.onChange(event.target.value.toUpperCase())}
                        isValid={Boolean(!isTouched || (isTouched && !error))}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formMethods.control}
                name="type"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>Device Type *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      key={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger isValid={!error} value={field.value}>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectItems.map(({ id, label: itemLabel, icon }) => (
                          <SelectItem key={id} value={id} className="gap-2">
                            <div className="w-full flex gap-2 items-center">
                              {icon}
                              {itemLabel}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formMethods.control}
                name="hdd_capacity"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>HDD Capacity (GB) *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex.: 4"
                        {...field}
                        type="number"
                        value={field.value || ''}
                        onChange={event => field.onChange(+event.target.value)}
                        isValid={!error}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={primary.onClick}
                className={primary.className}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" loading={isSubmitting}>
                {secondary.label}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      )}
    </DialogContent>
  );
}

export default AddEditDeviceView;
