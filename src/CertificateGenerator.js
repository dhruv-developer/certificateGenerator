import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Container,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CertificateGenerator = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    equipmentTested: '',
    customerName: '',
    transformerRatio: '',
    burden: '',
    accuracyClass: '',
    serialNo: '',
  });

  const equipmentOptions = [
    { value: '1', label: '11 KV INDOOR VOLTAGE TRANSFORMER-P.T. (Epoxy Resin Type)' },
    { value: '2', label: '11 KV CURRENT TRANSFORMER-C.T (Epoxy Resin Type)' },
    { value: '3', label: 'LOW TENSION- L.T. C.T (Epoxy Resin Type)' },
    { value: '4', label: '11 kV CT PT Combined Metering Unit' },
  ];

  const burdenOptions = ["2.5VA", "5VA", "10VA", "15VA"];
  const accuracyClassOptions = ["0.2s", "0.2", "0.5", "0.5s", "1"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getSpecificationText = (equipmentTested) => {
    switch (equipmentTested) {
      case '1':
      case '3':
        return 'The Following Routine Test conforming to IS:16227 (1 & 3)';
      case '2':
        return 'The Following Routine Test conforming to IS:16227 (1 & 2)';
      case '4':
        return 'The Following Routine Test conforming to IS:2705/1992 & 3156/1992';
      default:
        return 'The Following Routine Test conforming to IS:2705/1992';
    }
  };

  const generatePDF = () => {
    const { equipmentTested, customerName, transformerRatio, burden, accuracyClass, serialNo } = formData;
    const equipmentName = equipmentOptions.find((option) => option.value === equipmentTested)?.label;
    const specificationText = getSpecificationText(equipmentTested);
  
    const documentDefinition = {
      content: [
        { text: 'SHIV ELECTRICAL & ENGINEERING WORKS', style: 'header' },
        { text: 'Works (Routine) Test Certificate', style: 'subheader' },
        {
          table: {
            body: [
              ['1. EQUIPMENT TESTED', equipmentName],
              ['2. CUSTOMER NAME', customerName],
              ['3. SPECIFICATIONS', specificationText],
              ...(equipmentTested !== '4' ? [
                ['4. RATIO', (equipmentTested === '1') ? '11000/110V' : transformerRatio],
                ['5. RATED VOLTAGE', equipmentTested === '3' ? '415V' : '11 KV'],
                ...(equipmentTested !== '3' ? [['6. H S V', '12 KV']] : []),
                ['7. BURDEN', burden],
                ['8. ACCURACY CLASS', accuracyClass],
                ['9. I L', equipmentTested === '3' ? '.66kV' : '28 KV / 75 KVp'],
                ['10. FREQUENCY', '50 HZ'],
                ['11. S.T.C', equipmentTested === '3' ? '' : '13.1 KA for 1 Sec'],
              ] : [
                ['4. Sr. No.', serialNo],
                ['5. RATIO', transformerRatio],
                ['6. RATED VOLTAGE', '11 KV'],
                ['7. H S V', '12 KV'],
                ['8. BURDEN', burden],
                ['9. ACCURACY CLASS', accuracyClass],
                ['10. I L', '28 KV / 75 KVp'],
                ['11. FREQUENCY', '50 HZ'],
                ['12. S. T. C', '13.1 KV for 1 Sec.'],
                ['13. VOLTAGE FACTOR', '1.2 TIMES CONT. & 1.5 FOR 30 SEC.'],
              ]),
              ...(equipmentTested === '1' ? [
                ['12. The Following Test have been Conducted on above CT', ''],
                ['I. Verification of terminal marking and Polarity test', 'OK'],
                ['II. Ratio & Phase Error Test on CT', 'OK ( Result Attached )'],
                ['III. Power Frequency dry withstand test between primary winding & earth', '28 KV (rms) Withstood (Secondary terminal shorted together and earthed)'],
                ['IV. Power Frequency dry withstand test between Secondary winding & earth', '3 KV (rms) Withstood'],
                ['V. Over Voltage Inter-turn Test on secondary winding at 280V, thstand Test 280V , 150 HZ for 40 sec. ON secondary winding', 'Withstood'],
                ['VI. Partial Discharge Test as per IS 11322/1985', 'Withstood'],
                ['VII. PRIMARY Terminal Marking', 'A B C N'],
                ['VIII. SECONDARY Terminal Marking', 'a b c n'],
              ] : []),
              ...(equipmentTested === '2' ? [
                ['12. The Following Test have been Conducted on above CT', ''],
                ['I. Verification of terminal marking and Polarity test', 'OK'],
                ['II. Ratio & Phase Error Test on CT', 'OK ( Result Attached )'],
                ['III. Power Frequency dry withstand test between primary winding & earth', '28 KV (rms) Withstood (Secondary terminal shorted together and earthed)'],
                ['IV. Power Frequency dry withstand test between Secondary winding & earth', '3 KV (rms) Withstood'],
                ['V. Over Voltage Inter-turn Test on secondary winding at rated current for 60 sec', 'Withstood'],
                ['VI. Partial Discharge Test as per IS 11322/1985', 'Withstood'],
                ['VII. PRIMARY Terminal Marking', 'P1-P2'],
                ['VIII. SECONDARY Terminal Marking', 'S1-S2'],
              ] : []),
              ...(equipmentTested === '3' ? [
                ['12. The Following Test have been Conducted on above CT', ''],
                ['I. Verification of terminal marking and Polarity test', 'OK'],
                ['II. Ratio & Phase Error Test on CT', 'OK ( Result Attached )'],
                ['III. Power Frequency dry withstand test between primary winding & earth', '3 KV (rms) Withstood (Secondary terminal shorted together and earthed)'],
                ['IV. Power Frequency dry withstand test between Secondary winding & earth', '3 KV (rms) Withstood'],
                ['V. PRIMARY Terminal Marking', 'P1-P2'],
                ['VI. SECONDARY Terminal Marking', 'S1-S2'],
              ] : []),
              ...(equipmentTested === '4' ? [
                ['12. The Following Test have been Conducted on above CT & PT', ''],
                ['I. Verification of terminal marking and Polarity test', 'OK'],
                ['II. Ratio & Phase Error Test on CTPT', 'OK ( Result Attached )'],
                ['III. Power Frequency dry withstand test between primary winding & earth', '28 KV (rms) Withstood (Secondary terminal shorted together and earthed)'],
                ['IV. Power Frequency dry withstand test between Secondary winding & earth', '3 KV (rms) Withstood'],
                ['V. Over Voltage Inter-turn Test on secondary winding at rated current for 60 sec', 'Withstood'],
                ['VI. Partial Discharge Test as per IS 11322/1985', 'Withstood'],
                ['VII. Induced Over Voltage Withstand Test 280 V ,150 Hz for 40 sec. On secondary winding', 'Withstood'],
              ] : []),
            ],
          },
          style: 'table',
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
        subheader: { fontSize: 14, bold: true, alignment: 'center', margin: [0, 10, 0, 5] },
        table: { margin: [0, 5, 0, 15] },
      },
    };
  
    pdfMake.createPdf(documentDefinition).download('certificate.pdf');
  };
  
  return (
    <Container component={Paper} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Certificate Generator
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <FormControl sx={{ m: 2, minWidth: 120 }}>
          <InputLabel>Equipment Tested</InputLabel>
          <Select name="equipmentTested" value={formData.equipmentTested} onChange={handleChange} fullWidth>
            {equipmentOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            name="customerName"
            label="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            fullWidth
            sx={{ flex: 1, maxWidth: isSmallScreen ? '100%' : '48%' }}
          />
          {(formData.equipmentTested !== '4' || formData.equipmentTested === '4') && (
            <TextField
              name="transformerRatio"
              label="Transformer Ratio"
              value={formData.transformerRatio}
              onChange={handleChange}
              fullWidth
              sx={{ flex: 1, maxWidth: isSmallScreen ? '100%' : '48%' }}
            />
          )}
        </Box>
        <FormControl sx={{ m: 2, minWidth: 120 }}>
          <InputLabel>Burden</InputLabel>
          <Select name="burden" value={formData.burden} onChange={handleChange} fullWidth>
            {burdenOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 2, minWidth: 120 }}>
          <InputLabel>Accuracy Class</InputLabel>
          <Select name="accuracyClass" value={formData.accuracyClass} onChange={handleChange} fullWidth>
            {accuracyClassOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {formData.equipmentTested === '4' && (
          <TextField
            name="serialNo"
            label="Serial No"
            value={formData.serialNo}
            onChange={handleChange}
            fullWidth
            sx={{ m: 2 }}
          />
        )}
        <Button variant="contained" color="primary" onClick={generatePDF} sx={{ m: 2, alignSelf: 'center'        }}>
          Generate Certificate
        </Button>
      </Box>
    </Container>
  );
};

export default CertificateGenerator;
