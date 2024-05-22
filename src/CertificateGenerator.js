import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Box, Container, Paper } from '@mui/material';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CertificateGenerator = () => {
  const [formData, setFormData] = useState({
    equipmentTested: '',
    customerName: '',
    transformerRatio: '',
    hsv: '',
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

  const hsvOptions = ["2.5VA", "5VA", "10VA", "15VA"];
  const burdenOptions = ["0.2s", "0.2", "0.5", "0.5s", "1"];
  const accuracyClassOptions = ["0.2", "0.2s", "0.5", "0.5s", "1"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generatePDF = () => {
    const { equipmentTested, customerName, transformerRatio, hsv, burden, accuracyClass, serialNo } = formData;
    const equipmentName = equipmentOptions.find((option) => option.value === equipmentTested)?.label;


    const documentDefinition = {
      content: [
        { text: 'SHIV ELECTRICAL & ENGINEERING WORKS', style: 'header' },
        { text: 'Works (Routine) Test Certificate', style: 'subheader' },
        {
          table: {
            body: [
              ['1. EQUIPMENT TESTED', equipmentName],
              ['2. CUSTOMER NAME', customerName],
              ['3. SPECIFICATIONS', 'The Following Routine Test conforming to IS:16227 (1 & 3)'],
              ...(equipmentTested !== '4' ? [
                ['4. RATIO', transformerRatio],
                ['5. RATED VOLTAGE', equipmentTested === '3' ? '415V' : '11 KV'],
                ['6. H S V', hsv],
                ['7. BURDEN', burden],
                ['8. ACCURACY CLASS', accuracyClass],
                ['9. I L', equipmentTested === '3' ? '.66kV' : '28 KV / 75 KVp'],
                ['10. FREQUENCY', '50 HZ'],
                ['11. S.T.C', '13.1 KA for 1 Sec'],
              ] : [
                ['4. Sr. No.', serialNo],
                ['5. RATIO', '250/5A'],
                ['6. RATED VOLTAGE', '11 KV'],
                ['7. H S V', '12 KV'],
                ['8. BURDEN', '5 VA'],
                ['9. ACCURACY CLASS', '0.5'],
                ['10. I L', '28 KV / 75 KVp'],
                ['11. FREQUENCY', '50 HZ'],
                ['12. S. T. C', '13.1 KV for 1 Sec.'],
                ['13. VOLTAGE FACTOR', '1.2 TIMES CONT. & 1.5 FOR 30 SEC.'],
              ]),
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
      <Box component="form" sx={{ '& .MuiTextField-root': { m: 2 }, display: 'flex', flexDirection: 'column' }}>
        <FormControl sx={{ m: 2, minWidth: 120 }}>
          <InputLabel>Equipment Tested</InputLabel>
          <Select name="equipmentTested" value={formData.equipmentTested} onChange={handleChange}>
            {equipmentOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="customerName"
          label="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          fullWidth
        />
        {formData.equipmentTested !== '4' && (
          <>
            <TextField
              name="transformerRatio"
              label="Transformer Ratio"
              value={formData.transformerRatio}
              onChange={handleChange}
              fullWidth
            />
            <FormControl sx={{ m: 2, minWidth: 120 }}>
              <InputLabel>HSV</InputLabel>
              <Select name="hsv" value={formData.hsv} onChange={handleChange}>
                {hsvOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 120 }}>
              <InputLabel>Burden</InputLabel>
              <Select name="burden" value={formData.burden} onChange={handleChange}>
                {burdenOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 120 }}>
              <InputLabel>Accuracy Class</InputLabel>
              <Select name="accuracyClass" value={formData.accuracyClass} onChange={handleChange}>
                {accuracyClassOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
        {formData.equipmentTested === '4' && (
          <TextField
            name="serialNo"
            label="Serial No"
            value={formData.serialNo}
            onChange={handleChange}
            fullWidth
          />
        )}
        <Button variant="contained" color="primary" onClick={generatePDF} sx={{ m: 2 }}>
          Generate Certificate
        </Button>
      </Box>
    </Container>
  );
};

export default CertificateGenerator;
