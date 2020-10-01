import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IBindingCallback1 } from 'models/Callbacks';
import styles from './styles.module.sass';
import { IAppState } from 'models/AppState';
import { IBulletin } from '../../models/IBulletin';
import { Pagination } from 'semantic-ui-react';
import { fetchBulletinsRoutine } from 'screens/Bulletins/routines';
import LoaderWrapper from '@components/LoaderWrapper';
import BulletinCard from '@components/BulletinCard';
import { parseDate } from '@helpers/date.helper';

export interface IBulletinsPageProps {
  total: Number;
  bulletins: Array<IBulletin>;
  loading: boolean;
  fetchBulletins: IBindingCallback1<Number>;
}

const BulletinsPage: React.FunctionComponent<IBulletinsPageProps> = ({
  total, bulletins, loading, fetchBulletins
}) => {
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    if (loading && bulletins.length === 0) fetchBulletins(0);
  }, [bulletins]);

  const handlePageChange = (e, pageInfo) => {
    setActivePage(pageInfo.activePage);
    fetchBulletins(pageInfo.activePage - 1);
    window.scrollTo(0, 0);
  }
  
  return (
      <div className={styles.main_container}>
        <LoaderWrapper loading={loading}>
          <div className={styles.wide_container}>
            <div className={styles.main_content}>
              {bulletins.length !== 0 && (
              <>
                <div className={styles.bulletins_container}>
                  {bulletins.map(b => (
                  <BulletinCard 
                    key={b.id}
                    name={b.name}
                    text={b.text}
                    image={b.image}
                    author={b.author}
                    date={parseDate(b.date)}
                  />
                  ))}
                </div> 
                <Pagination
                  className={styles.pages}
                  activePage={activePage}
                  totalPages={Math.ceil((total as number)/10)}
                  onPageChange={handlePageChange}
                />
              </>
              )}
            </div> 
          </div> 
        </LoaderWrapper>
      </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { bulletins } = state;
  return {
    total: bulletins.data.total,
    bulletins: bulletins.data.bulletins,
    loading: !bulletins.data.isLoaded || bulletins.requests.bulletinsRequest.loading
  };
};

const mapDispatchToProps = {
  fetchBulletins: fetchBulletinsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(BulletinsPage);
