import React, { PureComponent } from 'react';
import DataTable from 'shared/components/dataTable/DataTable';
import Filters from 'shared/components/filters/Filters';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import BeforeStudentCertificateDialog from 'pages/beforeStudentCertificateDialog/BeforeStudentCertificateDialog';

export class StudentCertification extends PureComponent {

    render() {
        return (
            <div>
                <div style={{ fontSize: '40px' }}>Xác Nhận Sinh Viên</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Filters />
                    <ContainedButton label='Lọc sinh viên' />
                </div>
                <DataTable />
                <div style={{ display: 'flex', justifyContent: 'row' }}>
                    <BeforeStudentCertificateDialog />
                    <ContainedButton label='Xem danh sách in' />
                    <ContainedButton label='In' />
                    <ContainedButton label='Xuất' />

                </div>

            </div>
        );
    }
}

export default StudentCertification;
