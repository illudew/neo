from functools import partial
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
s=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
Thread(target=s.serve_forever,daemon=True).start()
url=f'http://127.0.0.1:{s.server_port}'
try:
 with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True)
  page=b.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  for w in [390,1440]:
   page.set_viewport_size({'width':w,'height':900})
   for path in ['index.html','methods.html']:
    assert page.goto(url+'/'+path).status==200
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(w,path)
    for href in page.locator('a[href^="#"]').evaluate_all('(els)=>els.map(e=>e.getAttribute("href"))'):
     assert page.locator(href).count()==1,href
    for detail in page.locator('details').all():
     detail.locator('summary').click();assert detail.get_attribute('open') is not None
  assert page.locator('#convergence tr').count()==5
  page.locator('#stability button').click()
  assert '满足本例' in page.locator('#stability-result').inner_text()
  page.locator('#dx').fill('0.025');assert '重新检查' in page.locator('#stability-result').inner_text()
  page.locator('#stability button').click();assert '超出本例' in page.locator('#stability-result').inner_text()
  page.locator('#dx').fill('0');assert not page.locator('#dx').evaluate('(e)=>e.checkValidity()')
  page.goto(url+'/index.html');page.locator('nav a[href="methods.html"]').click();assert page.url.endswith('/methods.html')
  context=b.new_context(java_script_enabled=False);plain=context.new_page();plain.goto(url+'/methods.html')
  assert plain.locator('details').count()==6
  assert plain.locator('#convergence tr').count()==2
  assert plain.locator('#stability button').is_hidden()
  plain.locator('aside a[href="#tensor"]').click();assert plain.url.endswith('#tensor')
  page.screenshot(path='/tmp/neo-methods.png',full_page=False)
  assert not errors,errors
  b.close()
  print('PASS: mobile/desktop, anchors, 12 exercises, navigation, numerical controls, no-JS fallback, no page errors')
finally:s.shutdown()
