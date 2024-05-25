import { Grid } from '@mui/material'
import ResponsiveDrawer from '../components/Drawer/ResponsiveDrawer'

export default function About (): JSX.Element {
  return (
    <>
      <ResponsiveDrawer selected='SOBRE'>
        <Grid container justifyContent='center' style={{ background: '#F5F5F5', padding: '20px', fontFamily: 'Trebuchet MS, sans-serif' }}>
          <Grid item xs={12} padding={2}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Portal da Dengue - Três passos</h1>
            <p style={{ fontSize: '20px', lineHeight: '1.5', margin: '0' }}>
              O Portal da Dengue - Três passos foi desenvolvido com o objetivo de ter um portal de domínio público
              para que as pessoas possam relatar pontos de dengue no município. Dessa forma, a prefeitura tem melhores
              dados e pode agir de forma mais eficiente no controle e ações a serem tomadas. Com esse portal, a população
              também tem como acompanhar estatísticas e informações atualizadas da situação da dengue no município.
            </p>
          </Grid>
          <hr style={{ width: '100%', margin: '20px 0' }} />
          <Grid item xs={12}>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '10px' }}>1. HOME</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.5', margin: '0' }}>Tela principal. Aqui você pode visualizar através do mapa de calor as estatísticas de cada bairro.</p>
          </Grid>
          <hr style={{ width: '100%', margin: '20px 0' }} />
          <Grid item xs={12}>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '10px' }}>2. CADASTRAR PONTO</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.5', margin: '0' }}>Essa tela é responsável por cadastrar um novo ponto de foco. Você pode descrever o ponto e selecionar a localização no mapa.</p>
          </Grid>
          <hr style={{ width: '100%', margin: '20px 0' }} />
          <Grid item xs={12}>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '10px' }}>3. INFORMATIVOS</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.5', margin: '0' }}>Essa tela é responsável por exibir informações sobre a dengue e como se prevenir.</p>
          </Grid>
          <hr style={{ width: '100%', margin: '20px 0' }} />
          <Grid item xs={12}>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '10px' }}>4. ESTATÍSTICAS</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.5', margin: '0' }}>Essa tela é responsável por exibir estatísticas detalhadas sobre a situação da dengue no município.</p>
          </Grid>
          <hr style={{ width: '100%', margin: '20px 0' }} />
          <Grid item xs={12}>
            <h2 style={{ fontWeight: '500', marginBottom: '10px' }}>DESENVOLVEDORES</h2>
            <p style={{ fontSize: '15px', lineHeight: '1.5', margin: '0' }}>
              <ul>
                <li>TULIO CESAR FELDMANN</li>
                <li>MICHEL FELIPE KROHN FORSCH</li>
                <li>VINICIUS RODOLFO BENDER CARLSON</li>
                <li>MATHEUS BASSANI GUEDES</li>
              </ul>
            </p>
          </Grid>
        </Grid>
      </ResponsiveDrawer>
    </>
  )
}
