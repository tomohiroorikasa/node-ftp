Description
===========

Please refer to [node-ftp](https://github.com/mscdex/node-ftp).

Added Encoding parameter.

API
===

Methods
-------

* **connect**(< _object_ >config) - _(void)_ - Connects to an FTP server. Valid config properties:

    * host - _string_ - The hostname or IP address of the FTP server. **Default:** 'localhost'

    * port - _integer_ - The port of the FTP server. **Default:** 21

    * secure - _mixed_ - Set to true for both control and data connection encryption, 'control' for control connection encryption only, or 'implicit' for implicitly encrypted control connection (this mode is deprecated in modern times, but usually uses port 990) **Default:** false

    * secureOptions - _object_ - Additional options to be passed to `tls.connect()`. **Default:** (none)

    * user - _string_ - Username for authentication. **Default:** 'anonymous'

    * password - _string_ - Password for authentication. **Default:** 'anonymous@'

    * connTimeout - _integer_ - How long (in milliseconds) to wait for the control connection to be established. **Default:** 10000

    * pasvTimeout - _integer_ - How long (in milliseconds) to wait for a PASV data connection to be established. **Default:** 10000

    * keepalive - _integer_ - How often (in milliseconds) to send a 'dummy' (NOOP) command to keep the connection alive. **Default:** 10000

    * fileEncoding - _string_ - Transfer encoding. **Default:** 'binary' <- ***Added***

### Extended methods

* **nlist**([< _string_ >path, ][< _boolean_ >useCompression, ]< _function_ >callback) - _(void)_
  > Behavior is the same as `list` method. Use `NLST -alL` for internal execute

* **mlist**([< _string_ >path, ][< _boolean_ >useCompression, ]< _function_ >callback) - _(void)_
    > Behavior is the same as `list` method. Use MLSD` for internal execute

how to use
---

fileEncode に 'UTF8' 等を指定すると、listコマンドの戻りにANK以外のファイル名があっても正しく受信できるようになります。
