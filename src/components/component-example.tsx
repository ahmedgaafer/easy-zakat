import { ExampleWrapper } from '@/components/example';
import { useTranslation } from '@/i18n/useTranslation';

export function ComponentExample() {
	const t = useTranslation();

	return (
		<ExampleWrapper>
			<div className="text-9xl text-violet-500">{t('navigation.menu')}</div>
		</ExampleWrapper>
	);
}
