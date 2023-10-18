package com.cp.praha.websocket.config;

import org.springframework.util.Assert;

import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * Created by baiguantao on 2017/8/4.
 * User session record class
 */
public class SocketSessionRegistry{

    private final ConcurrentMap<String, Set<String>> userSessionIds = new ConcurrentHashMap<String, Set<String>>();
    private final Object lock = new Object();

    public SocketSessionRegistry() {
    }

    /**
     *
     * Get session Id
     * @param user
     * @return
     */
    public Set<String> getSessionIds(String user) {
        Set<String> set = (Set<String>)this.userSessionIds.get(user);
        return set != null?set: Collections.emptySet();
    }

    /**
     * Get all session s
     * @return
     */
    public ConcurrentMap<String, Set<String>> getAllSessionIds() {
        return this.userSessionIds;
    }

    /**
     * register session
     * @param user
     * @param sessionId
     */
    public void registerSessionId(String user, String sessionId) {
        Assert.notNull(user, "User must not be null");
        Assert.notNull(sessionId, "Session ID must not be null");
        synchronized(this.lock) {
            Set<String> set = (Set<String>)this.userSessionIds.get(user);
            if(set == null) {
                set = new CopyOnWriteArraySet<String>();
                this.userSessionIds.put(user, set);
            }

            ((Set)set).add(sessionId);
        }
    }

    public void unregisterSessionId(String userName, String sessionId) {
        Assert.notNull(userName, "User Name must not be null");
        Assert.notNull(sessionId, "Session ID must not be null");
        synchronized(this.lock) {
        	 Set<String> set = (Set<String>)this.userSessionIds.get(userName);
            if(set != null && set.remove(sessionId) && set.isEmpty()) {
                this.userSessionIds.remove(userName);
            }

        }
    }
}
