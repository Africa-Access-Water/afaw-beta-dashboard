import { Alert, Button } from 'flowbite-react';
import { IconAlertCircle, IconRefresh } from '@tabler/icons-react';
import CardBox from '../../components/shared/CardBox';
import DonorsCards from '../../components/donors/DonorsCards';
import { useDonationsData } from '../../hooks/useDonationsData';

const Donors = () => {
  const { donors, loading, error, refetch } = useDonationsData();

  if (error) {
    return (
      <div className="space-y-6">
        <Alert color="failure" icon={IconAlertCircle}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Error Loading Data</h3>
              <p className="mt-1 text-sm">{error}</p>
            </div>
            <Button
              size="sm"
              color="failure"
              onClick={refetch}
              className="flex items-center gap-2"
            >
              <IconRefresh size={16} />
              Retry
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Donors Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track all donor activities
          </p>
        </div>
        <Button
          color="light"
          onClick={refetch}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <IconRefresh size={16} className={loading ? 'animate-spin' : ''} />
          Refresh Data
        </Button>
      </div>

      {/* Main Content */}
      <CardBox>
        <DonorsCards
          donors={donors}
          loading={loading}
        />
      </CardBox>
    </div>
  );
};

export default Donors;