import { Document, Page, StyleSheet, View, Text } from '@react-pdf/renderer';
import { DateTime } from 'luxon';

export default function DocPdf({ productos, zapatos, area_venta }) {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    secondHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 5,
      marginTop: 20,
    },
    table: {
      width: '100%',
    },
    tableRow: {
      flexDirection: 'row',
      borderTopWidth: '1px',
      borderColor: '#e5e5e5',
      padding: 5,
    },
    tableRowHeader: {
      flexDirection: 'row',
      padding: 5,
    },
    tableCol: {
      width: '100%',
    },
    tableCellHeader: {
      margin: 'auto',
      margin: 5,
      color: '#737373',
      fontSize: 10,
    },
    tableCell: {
      margin: 'auto',
      margin: 5,
      fontSize: 10,
    },

    h1: {
      marginLeft: 5,
      fontSize: 12,
    },

    h2: {
      marginLeft: 5,
      fontSize: 12,
      color: '#737373',
    },

    footerText: {
      marginTop: 20,
      fontSize: 10,
      textAlign: 'center',
      color: 'grey',
    },
  });

  const productosPorCategoria = productos.reduce((acc, producto) => {
    const categoria = producto.categoria__nombre || 'Sin categoría';
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(producto);
    return acc;
  }, {});

  return (
    <Document>
      <Page style={styles.page} size="A4">
        <View style={styles.header}>
          <View>
            <Text style={styles.h1}>Inventario</Text>
            <Text style={styles.h1}>
              {DateTime.fromISO(new Date().toISOString()).toLocaleString(
                DateTime.DATE_FULL,
                { locale: 'es' }
              )}
            </Text>
          </View>
          <Text style={styles.h1}>{area_venta}</Text>
        </View>

        {Object.keys(productosPorCategoria).map((categoria, index) => (
          <View key={index}>
            <View style={styles.secondHeader}>
              <Text key={categoria} style={styles.h1}>
                {categoria}
              </Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRowHeader}>
                <View style={{ width: '20%' }}>
                  <Text style={styles.tableCellHeader}>Código</Text>
                </View>
                <View style={{ width: '70%' }}>
                  <Text style={styles.tableCellHeader}>Descripción</Text>
                </View>
                <View style={{ width: '10%' }}>
                  <Text style={styles.tableCellHeader}>Cantidad</Text>
                </View>
              </View>

              {productosPorCategoria[categoria].map((d, index) => (
                <View style={styles.tableRow} key={index}>
                  <View style={{ width: '20%' }}>
                    <Text style={styles.tableCell}>{d.codigo}</Text>
                  </View>
                  <View style={{ width: '70%' }}>
                    <Text style={styles.tableCell}>{d.descripcion}</Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Text style={styles.tableCell}>{d.cantidad}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        {zapatos && zapatos?.length > 0 && (
          <>
            <View style={styles.secondHeader}>
              <Text style={styles.h1}>Zapatos</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRowHeader}>
                <View style={{ width: '10%' }}>
                  <Text style={styles.tableCellHeader}>Id</Text>
                </View>
                <View style={{ width: '10%' }}>
                  <Text style={styles.tableCellHeader}>Código</Text>
                </View>
                <View style={{ width: '60%' }}>
                  <Text style={styles.tableCellHeader}>Descripción</Text>
                </View>
                <View style={{ width: '10%' }}>
                  <Text style={styles.tableCellHeader}>Color</Text>
                </View>
                <View style={{ width: '10%' }}>
                  <Text style={styles.tableCellHeader}>Número</Text>
                </View>
              </View>

              {zapatos.map((d, index) => (
                <View style={styles.tableRow} key={index}>
                  <View style={{ width: '10%' }}>
                    <Text style={styles.tableCell}>{d.id}</Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Text style={styles.tableCell}>{d.info__codigo}</Text>
                  </View>
                  <View style={{ width: '60%' }}>
                    <Text style={styles.tableCell}>{d.info__descripcion}</Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Text style={styles.tableCell}>{d.color}</Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Text style={styles.tableCell}>{d.numero}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </Page>
    </Document>
  );
}
